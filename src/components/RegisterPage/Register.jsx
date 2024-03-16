import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import ReCAPTCHA from "react-google-recaptcha";

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [isVisible, setIsVisible] = useState(false);
  const [isRecaptchaVerified, setIsRecaptchaVerified] = useState(false);

  useEffect(() => {
    const allFieldsFilled =
      email !== "" &&
      name !== "" &&
      surname !== "" &&
      dateOfBirth !== "" &&
      phoneNumber !== "" &&
      username !== "" &&
      password !== "" &&
      isRecaptchaVerified;

    // Imposta lo stato di verifica di Recaptcha
    setIsRecaptchaVerified(allFieldsFilled);
  }, [
    email,
    name,
    surname,
    dateOfBirth,
    phoneNumber,
    username,
    password,
    isRecaptchaVerified,
  ]);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const register = () => {
    if (
      email !== "" &&
      name !== "" &&
      surname !== "" &&
      dateOfBirth !== "" &&
      phoneNumber !== "" &&
      username !== "" &&
      password !== "" &&
      isRecaptchaVerified
    ) {
      const api = "http://localhost:3001/auth/register";
      fetch(api, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          name,
          surname,
          dateOfBirth,
          phoneNumber,
          username,
          password,
        }),
      })
        .then((res) => {
          console.log("Risposta dal server:", res);
          if (res.ok) {
            return res.json();
          } else {
            throw new Error("Errore nel caricamento dati");
          }
        })
        .then((data) => {
          console.log("Registrazione avvenuta con successo:", data);
        })
        .catch((err) => {
          console.log("Errore durante la registrazione:", err);
        });
    } else {
      console.log("Compila tutti i campi e verifica Recaptcha.");
    }
  };

  return (
    <Row className="py-5 mx-auto myfont">
      <Col className="col-5 mx-auto">
        <h3 className="text-center pb-5">Registrati</h3>
        <h5 className="pb-2">Inserisci i tuoi dati</h5>

        <Form>
          {" "}
          <Col className="col-12">
            <div className="flex flex-col gap-4">
              <div
                key="faded"
                className="flex flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 pt-2"
              >
                <Input
                  type="text"
                  variant="faded"
                  label="Nome"
                  placeholder="Il tuo nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
          </Col>
          <Col className="col-12">
            <div className="flex flex-col gap-4">
              <div
                key="faded"
                className="flex flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 pt-2"
              >
                <Input
                  type="text"
                  variant="faded"
                  label="Cognome"
                  placeholder="Il tuo cognome"
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                />
              </div>
            </div>
          </Col>
          <Col className="col-12">
            <div className="flex flex-col gap-4">
              <div
                key="faded"
                className="flex flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 pt-2"
              >
                <Input
                  type="date"
                  variant="faded"
                  label="Data di nascita"
                  placeholder="La tua data di nacita"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                />
              </div>
            </div>
          </Col>
          <Col className="col-12">
            <div className="flex flex-col gap-4">
              <div
                key="faded"
                className="flex flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 pt-2"
              >
                <Input
                  type="text"
                  variant="faded"
                  label="Username"
                  placeholder="Il tuo username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>
          </Col>
          <Col className="col-12">
            <div className="flex flex-col gap-4">
              <div
                key="faded"
                className="flex flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 pt-2"
              >
                <Input
                  type="email"
                  variant="faded"
                  label="Email"
                  placeholder="La tua email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
          </Col>
          <Col className="col-12">
            <Input
              label="Password"
              variant="faded"
              placeholder="La tua password"
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibility}
                >
                  {isVisible ? (
                    <BsFillEyeSlashFill className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <BsFillEyeFill className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
              type={isVisible ? "text" : "password"}
              className="flex flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 pt-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Col>
          <Col className="col-12">
            <div className="flex flex-col gap-4">
              <div
                key="faded"
                className="flex flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 pt-2"
              >
                <Input
                  type="number"
                  variant="faded"
                  label="Numero di telefono"
                  placeholder="Il tuo numero di telefono"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
            </div>
          </Col>
          <div className="flex gap-4 items-center pt-2">
            {" "}
            <ReCAPTCHA
              sitekey={process.env.REACT_APP_SITE_KEY}
              onChange={(value) => setIsRecaptchaVerified(!!value)}
            />
          </div>
          <div className="flex gap-4 items-center">
            <Button
              className="mt-2"
              size="md"
              onClick={register}
              disabled={!isRecaptchaVerified}
            >
              Registrati
            </Button>
          </div>
        </Form>
      </Col>
    </Row>
  );
};
export default Register;
