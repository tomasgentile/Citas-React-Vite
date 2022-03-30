import { useEffect, useState } from "react"
import Form from "./components/Form"
import Header from "./components/Header"
import PatientList from "./components/PatientList"


function App() {
  const [patients, setPatients] = useState([]);
  const [patient, setPatient] = useState({});

  useEffect(() => {
    const getLocalStoreage = () => {
      const patientsLocalStorage = JSON.parse(localStorage.getItem('patients')) ?? [];
      setPatients(patientsLocalStorage);
    }
    getLocalStoreage();
  }, []);

  useEffect(() => {
    localStorage.setItem('patients', JSON.stringify(patients));
  }, [patients]);

  const deletePatient = (id) => {
    const modifiedPatients = patients.filter(patientState => patientState.id != id);
    setPatients(modifiedPatients);
  }

  return (
    <div className="container mx-auto mt-20">
      <Header />
      <div className="mt-12 md:flex">
        <Form
          patients={patients}
          setPatients={setPatients}
          patient={patient}
          setPatient={setPatient}
        />
        <PatientList
          patients={patients}
          setPatient={setPatient}
          deletePatient={deletePatient}
        />
      </div>
    </div>
  )
}

export default App
