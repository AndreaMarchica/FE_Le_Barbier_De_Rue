import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { getMeDataAction } from "../../redux/actions";
import { loginAction } from "../../redux/actions";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const api = "http://localhost:3001/auth/login";
  const dispatch = useDispatch();

  const login = () => {
    fetch(api, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
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
        console.log("Login avvenuto con successo:", data);
        // Aggiungi un controllo per assicurarti che data sia definito
        if (data && data.token) {
          localStorage.setItem("token", data.token);
          dispatch(loginAction());
          dispatch(getMeDataAction());
        } else {
          console.error("Dati non validi nella risposta:", data);
        }
      })
      .catch((err) => {
        console.log("Errore durante il login:", err);
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
                className="flex flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4"
              >
                <Input
                  type="email"
                  variant="faded"
                  label="Email"
                  placeholder="Enter your email"
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
              placeholder="Enter your password"
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
              className="flex flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 pt-3"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Col>
          <div className="flex gap-4 items-center">
            <Button className="mt-3" size="md" onClick={login}>
              Login
            </Button>
          </div>
        </Form>
      </Col>
    </Row>
  );
};

export default Login;
