import { StyleSheet, Text, View } from "react-native";

import { useEffect, useState } from "react";
import axios from "axios";

import BonesIcon from "@/assets/images/JointsBone.svg";
import AnestesiaIcon from "@/assets/images/Icon_Anestesia.svg";
import CardioIcon from "@/assets/images/Icon_Cardio.svg";
import FaceIcon from "@/assets/images/face_24px.svg";

const API_URL =
  "https://wisemed-interview.s3.us-east-2.amazonaws.com/react-native/emergency-kinds.json";

type EmergencyKind = {
  id: number;
  name: string;
};

type GetEmergencyKindsResponseData = EmergencyKind[];

const doctor = {
  name: "Dr. José Pedro Sans",
  speciality: "",
};

const pacient = {
  name: "Jorge Avendaño Pérez",
  age: 35,
  medicalRecord: 77884,
  diagnosis: "Calcificación Talón",
  intervention: "Extirpación en talón",
  preAnestheticEvaluation: "Sí",
  requestTimeDays: 3,
  suspensions: 2,
};

export default function Index() {
  const [emergencyKinds, setEmergencyKinds] = useState<EmergencyKind[]>();

  useEffect(() => {
    const getEmergencyKinds = async () => {
      try {
        const response = await axios.get<GetEmergencyKindsResponseData>(
          API_URL
        );

        setEmergencyKinds(response.data);
      } catch (e) {}
    };

    getEmergencyKinds();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#CAC4D0",
      }}
    >
      <View style={styles.popup}>
        <View style={styles.popupHeader}>
          <View>
            <Text style={styles.speciality}>Traumatología</Text>
            <Text style={styles.doctorName}>Dr. José Pedro Sans</Text>
          </View>
          <BonesIcon
            width={50}
            height={50}
            style={{ transform: [{ rotate: "-10deg" }] }}
          />
        </View>
        <View style={styles.popupBody}>
          <View style={styles.row}>
            <FaceIcon />
            <Text style={styles.pacientName}>
              <Text>{pacient.name}</Text>
              {"\n"}
              <Text>{pacient.age} años</Text>
            </Text>
          </View>

          <View>
            <Info title="Ficha médica: " value={pacient.medicalRecord} />
            <Info title="Diagnóstico: " value={pacient.diagnosis} />
            <Info title="Intervención: " value={pacient.intervention} />
            <Info
              title="Evaluación preanestésica: "
              value={pacient.preAnestheticEvaluation}
            />
            <Info
              title="Tiempo de solicitud: "
              value={pacient.requestTimeDays}
            />
            <Info title="Suspensiones: " value={pacient.suspensions} />
          </View>
          <View style={styles.icons}>
            <CardioIcon />
            <AnestesiaIcon />
          </View>
        </View>
      </View>
    </View>
  );
}

type InfoProps = {
  title: string;
  value: string | number;
};

const Info = ({ title, value }: InfoProps) => (
  <View style={styles.info}>
    <Text style={styles.infoTitle}>{title}</Text>
    <Text style={styles.infoValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: 8,
  },
  icons: {
    flexDirection: "row",
  },
  popup: {
    backgroundColor: "white",
    borderRadius: 5,
    minWidth: 276,
  },
  popupBody: {
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderColor: "#719EC0",
    borderWidth: 1,
    padding: 20,
    gap: 8,
  },
  popupHeader: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    flexDirection: "row",
    backgroundColor: "#154FBF",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  speciality: {
    fontSize: 16,
    fontFamily: "Poppins-Semibold",
    color: "white",
  },
  doctorName: {
    fontFamily: "Poppins-Semibold",
    fontSize: 12,
    color: "white",
  },
  pacientName: {
    fontFamily: "Poppins-Medium",
  },
  info: {
    flexDirection: "row",
  },
  infoTitle: {
    fontFamily: "Poppins-Regular",
    color: "#154FBF",
    fontSize: 12,
  },
  infoValue: {
    fontFamily: "Poppins-Regular",
    color: "black",
    fontSize: 12,
  },
  infoContainer: {},
});
