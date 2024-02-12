import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { useDispatch } from "react-redux";

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const api = "http://localhost:3001/auth/register";
  const dispatch = useDispatch();

  const register = () => {
    fetch(api, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        surname,
        dateOfBirth,
        username,
        email,
        password,
        phoneNumber,
      }),
    })
      .then((res) => {
        console.log(res);
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Errore nel caricamento dati");
        }
      })
      .then((data) => {
        console.log("Registarzione avvenuta con successo:", data);
      })
      .catch((err) => {
        console.log("Errore durante la registrazione:", err);
      });
  };

  return (
    <Row className="pt-5 mx-auto">
      <Col className="col-5 mx-auto">
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
          <div className="flex gap-4 items-center">
            <Button className="mt-3" size="md" onClick={register}>
              Registrati
            </Button>
          </div>
        </Form>
      </Col>
    </Row>
  );
};
export default Register;
