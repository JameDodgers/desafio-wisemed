import { StyleSheet, Text, TouchableNativeFeedback, View } from "react-native";

import { useEffect, useRef, useState } from "react";
import axios from "axios";

import BonesIcon from "@/assets/images/JointsBone.svg";
import AnestesiaIcon from "@/assets/images/Icon_Anestesia.svg";
import CardioIcon from "@/assets/images/Icon_Cardio.svg";
import FaceIcon from "@/assets/images/face_24px.svg";
import { Picker, PickerRef } from "./components/Picker";

const API_URL =
  "https://wisemed-interview.s3.us-east-2.amazonaws.com/react-native/emergency-kinds.json";

type EmergencyKind = {
  id: number;
  name: string;
};

type GetEmergencyKindsResponseData = { emergencyKinds: EmergencyKind[] };

const doctor = {
  name: "Dr. José Pedro Sans",
  speciality: "Traumatología",
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
  const pickerRef = useRef<PickerRef>(null);
  const [emergencyKinds, setEmergencyKinds] = useState<EmergencyKind[]>();

  const [selectedEmergencyKindId, setSelectedEmergencyKindId] = useState<
    number | null
  >();

  useEffect(() => {
    const getEmergencyKinds = async () => {
      try {
        const response = await axios.get<GetEmergencyKindsResponseData>(
          API_URL
        );

        setEmergencyKinds(response.data.emergencyKinds);
      } catch (e) {}
    };

    getEmergencyKinds();
  }, []);

  const closeDropDownMenu = () => pickerRef.current?.hide();

  return (
    <TouchableNativeFeedback onPress={closeDropDownMenu}>
      <View style={styles.container}>
        <View style={styles.popup}>
          <View style={styles.popupHeader}>
            <View>
              <Text style={styles.speciality}>{doctor.speciality}</Text>
              <Text style={styles.doctorName}>{doctor.name}</Text>
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

            <Picker
              ref={pickerRef}
              label="Tipo de Urgencia"
              options={emergencyKinds}
              onSelect={(selectedItem) =>
                setSelectedEmergencyKindId(selectedItem.id)
              }
            />
          </View>
        </View>
      </View>
    </TouchableNativeFeedback>
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
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#CAC4D0",
    shadowColor: "#000",
  },
  row: {
    flexDirection: "row",
    gap: 4,
  },
  icons: {
    flexDirection: "row",
    marginBottom: 8,
  },
  popup: {
    backgroundColor: "white",
    borderRadius: 5,
    minWidth: 276,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
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
    paddingLeft: 20,
    paddingRight: 16,
    paddingVertical: 8,
  },
  speciality: {
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
    color: "white",
  },
  doctorName: {
    fontFamily: "Poppins-SemiBold",
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
