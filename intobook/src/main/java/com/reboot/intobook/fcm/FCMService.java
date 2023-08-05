package com.reboot.intobook.fcm;

import com.google.firebase.messaging.*;
import com.reboot.intobook.fcm.dto.UserPkFcmDto;
import com.reboot.intobook.user.entity.User;
import com.reboot.intobook.user.repository.UserRepository;
import com.reboot.intobook.utils.JwtUtil;
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class FCMService {
    @PersistenceContext
    EntityManager em;


    private final UserRepository userRepository;
    private final JwtUtil jwtUtil = new JwtUtil();


    //fcm알림 테스트를 위한 method
    public void test(String accessToken) throws Exception {
        Claims claims = jwtUtil.extractClaims(accessToken);
        Long userPk = claims.get("userPk", Long.class);
        Optional<User> temp = userRepository.findByUserPk(userPk);
        if(temp.isPresent()){
            User user = temp.get();

            String fcmToken = user.getFcmToken();
            Message message = Message.builder()
                    .putData("title", "판매 완료 알림")
                    .putData("content", "등록하신 판매 입찰이 낙찰되었습니다.")
                    .setToken(fcmToken)
                    .build();

            send(message);

        }else{
            throw new Exception("fcm test 실패");
        }
    }

    public void send(Message message) {
        FirebaseMessaging.getInstance().sendAsync(message);
    }

    //1시간마다 전체 유저의 가장 최근에 읽은 시간을 통해서 알람 보냄
    @Scheduled(fixedDelay = 36000)
    public void sendAlarm() throws FirebaseMessagingException {
        //user table에서 userPk를 전부 가져온다.
        TypedQuery<UserPkFcmDto> query = em.createQuery("select u.userPk, u.fcmToken from User u", UserPkFcmDto.class);
        List<UserPkFcmDto> resultList = query.getResultList();
        //userPk를 순회하면서 알람을 보내야 하면 알람 보내기
        List<String> selectedFcmTokens = new ArrayList<>();
        for(UserPkFcmDto userPkFcmDto: resultList){
            if(userPkFcmDto.getFcmToken() == null) continue;
            //나중에 로직 추가 userPk를 통해서 해당 사용자가 얼마나 오랫동안 책을 읽지 않았느지 체크한다. 그리고 알람을 보내야 하면 넣는다.
//            if(){
//                selectedFcmTokens.add(userPkFcmDto.getFcmToken());
//            }
        }

        MulticastMessage message = MulticastMessage.builder().addAllTokens(selectedFcmTokens).setNotification(Notification.builder()
                .setTitle("보내라")
                .setBody("굿")
                .build())
                .build();

        BatchResponse response = FirebaseMessaging.getInstance().sendMulticast(message);
        if (response.getFailureCount() > 0) {
            List<SendResponse> responses = response.getResponses();
            List<String> failedTokens = new ArrayList<>();
            for (int i = 0; i < responses.size(); i++) {
                if (!responses.get(i).isSuccessful()) {
                    failedTokens.add(selectedFcmTokens.get(i));
                }
            }
            // 실패한 registrationTokens에 대한 추가 처리 이건 나중에 할 예정
        }

    }
}