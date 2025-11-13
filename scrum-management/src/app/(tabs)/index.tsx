import { Ionicons } from "@expo/vector-icons";
import {
  OtpInput,
  ThemedButton,
  ThemedText,
  ThemedView,
} from "@shared/components";
import { Alert, ScrollView, StyleSheet } from "react-native";

export default function HomeScreen() {
  const handlePress = (buttonName: string) => {
    Alert.alert("Kliknuto!", `Kliknuli ste na ${buttonName}`);
  };
  const handleOtpComplete = (otp: string) => {
    console.log("OTP complete", otp);
  };
  return (
    <ScrollView>
      <ThemedView style={styles.container}>
        <OtpInput onComplete={handleOtpComplete} />
      </ThemedView>
      <ThemedView>
        <ThemedText variant="extraBold" size="xxl">
          ThemedButton Primeri
        </ThemedText>

        <ThemedText variant="medium" color="grey" style={{ marginBottom: 20 }}>
          Test svih varijanti i veličina
        </ThemedText>

        <ThemedView style={styles.section}>
          <ThemedText variant="bold" size="lg">
            Primary (Plava pozadina)
          </ThemedText>
          <ThemedButton
            variant="primary"
            size="sm"
            title="Primary Small"
            icon={<Ionicons name="arrow-forward" size={20} color="white" />}
            onPress={() => handlePress("Primary Small")}
          />
          <ThemedButton
            variant="primary"
            size="md"
            title="Primary Medium"
            onPress={() => handlePress("Primary Medium")}
          />
          <ThemedButton
            variant="primary"
            size="lg"
            title="Primary Large"
            icon={<Ionicons name="arrow-forward" size={20} color="white" />}
            onPress={() => handlePress("Primary Large")}
          />
        </ThemedView>

        <ThemedView style={styles.section}>
          <ThemedText variant="bold" size="lg">
            Secondary (Narandžasta pozadina)
          </ThemedText>
          <ThemedButton
            variant="secondary"
            size="sm"
            title="Secondary Small"
            onPress={() => handlePress("Secondary Small")}
          />
          <ThemedButton
            variant="secondary"
            size="md"
            title="Secondary Medium"
            onPress={() => handlePress("Secondary Medium")}
          />
          <ThemedButton
            variant="secondary"
            size="lg"
            title="Secondary Large"
            onPress={() => handlePress("Secondary Large")}
          />
        </ThemedView>

        <ThemedView style={styles.section}>
          <ThemedText variant="bold" size="lg">
            Tekst primeri
          </ThemedText>
          <ThemedText color="blue">Plavi tekst</ThemedText>
          <ThemedText variant="bold" color="red">
            Crveni bold tekst
          </ThemedText>
          <ThemedText variant="extraBold" color="brandBlack" size="xxl">
            brandBlack veliki naslov
          </ThemedText>
        </ThemedView>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: 52 },
  section: {
    marginBottom: 30,
    gap: 12,
  },
});
