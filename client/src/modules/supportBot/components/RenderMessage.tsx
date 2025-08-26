import Colors from '@/src/theme/colors';
import { moderateScale } from '@/src/utils/responsiveness/responsiveness';
import { Image } from 'expo-image';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import { Message } from "../SupportBot";
import CallMessage from './CallMessage';
import LinkMessage from './LinkMessage';
import MessageComponent from "./Message";

const RenderMessage = ({
  item,
  onOptionSelect,
  nextStep,
  currentMessageId
}: {
  item: Message;
  onOptionSelect?: (option: string, id : number) => void;
  nextStep: () => void;
  currentMessageId: number | null;
}) => {
  
    const {t} = useTranslation();
  if (item.sender === 'user') {
    // User message bubble, right aligned
    return (
      <View style={{ width: '100%', alignItems: 'flex-end', marginVertical: 4 }}>
        <Text
          style={{
            color: '#fff',
            backgroundColor: Colors.primaryCyanColor,
            padding: 10,
            borderRadius: 12,
            maxWidth: '80%',
          }}
        >
          {t(item.content ?? "")}
        </Text>
      </View>
    );
  } else {
    // Bot message, avatar and message side by side
    const botAvatar = (
      <View
        style={{
          width: 40,
          height: 40,
          borderRadius: 20,
          backgroundColor: '#fff',
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: 10,
          borderColor: Colors.primaryCyanColor,
          borderWidth: 2
        }}
      >
        <Image
          source={require("@/assets/images/bot.png")}
          contentFit="cover"
          style={{
            width: moderateScale(40),
            height: moderateScale(40),
            borderRadius: moderateScale(30),
          }}
        />
      </View>
    );

    if (item.type === 'call') {
      return (
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            marginVertical: 4,
            alignItems: 'center',
          }}
        >
          {botAvatar}
          <CallMessage item={item} nextStep={nextStep} isActive={currentMessageId === item.id} />
        </View>
      );
    } else if (item.type === 'link') {
      return (
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            marginVertical: 4,
            alignItems: 'center',
          }}
        >
          {botAvatar}
          <LinkMessage item={item} nextStep={nextStep} isActive={currentMessageId === item.id} />
        </View>
      );
    } else {
      return (
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            marginVertical: 4,
          }}
        >
          {botAvatar}
          <MessageComponent nextStep={nextStep} isBank={item.isBank} onOptionSelect={onOptionSelect} item={item} />
        </View>
      );
    }
  }
};

export default RenderMessage;
