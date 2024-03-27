import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCustomers, getProducts, getServices } from "../../redux/actions";
import { Col, FormControl, InputGroup, Row } from "react-bootstrap";
import { Button } from "@nextui-org/react";
import AddProductModal from "./AddProductModal";
import Swal from "sweetalert2";
import ModifyProductModal from "./ModifyProductModal";
import AddServiceModal from "./AddServiceModal";
import ModifyServiceModal from "./ModifyServiceModal";
import AddUserModal from "./AddUserModal";
import ModifyUserModal from "./ModifyUserModal";

//********************************* USERS *******************************************

const UserContent = () => {
  const dispatch = useDispatch();
  const customers = useSelector((state) => state.customers.customers);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(getCustomers());
  }, [dispatch]);

  const filteredCustomers = customers.filter((customer) => {
    // Filtra in base a qualsiasi dato che desideri (nome, cognome, email, ecc.)
    return (
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.surname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phoneNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.dateOfBirth.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleDeleteUser = (userId) => {
    fetch(`http://localhost:3001/users/${userId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          // Se la richiesta è andata a buon fine, aggiorna lo stato dei servizi nel frontend
          dispatch(getCustomers());
        } else {
          // Se c'è stato un errore nella richiesta DELETE, gestiscilo di conseguenza
          console.error("Errore durante l'eliminazione dell'utente");
        }
      })
      .catch((error) => {
        console.error("Errore durante la richiesta DELETE:", error);
      });
  };

  return (
    <>
      {" "}
      <h3 className="pt-5 text-center">Contenuto per Utenti</h3>
      <Row className=" d-flex align-items-center justify-content-center">
        <Col className="col-4">
          <InputGroup className="mb-3 mx-5">
            <FormControl
              placeholder="Cerca per nome, cognome, email, ecc."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />{" "}
            <AddUserModal></AddUserModal>
          </InputGroup>
        </Col>
      </Row>
      <Row className="visible">
        {/* Mappa i risultati dei clienti */}
        {filteredCustomers.map((customer) => (
          <Col
            key={customer.id}
            className="col-4 d-flex flex-column justify-content-center align-items-center"
          >
            <div className="d-flex flex-column justify-content-center align-items-center py-5">
              {/* Puoi personalizzare i campi come preferisci */}
              <img
                src={customer.avatar}
                alt="Avatar"
                style={{ borderRadius: "50%", width: "40px", height: "40px" }}
              />
              <p>
                <b>{`${customer.name} ${customer.surname}`}</b>
              </p>
              <p>Data di nascita: {customer.dateOfBirth}</p>
              <p>Telefono: {customer.phoneNumber}</p>
              <p>Email: {customer.email}</p>{" "}
              <div className="d-flex ">
                <ModifyUserModal customerData={customer} />
                <Button
                  color="danger"
                  className="m-2"
                  onClick={() =>
                    Swal.fire({
                      title: "Eliminare utente?",
                      text: "Stai per cancellare definitivamente questo utente",
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonColor: "#3085d6",
                      cancelButtonColor: "#d33",
                      confirmButtonText: "Elimina",
                      cancelButtonText: "Annulla",
                    }).then((result) => {
                      if (result.isConfirmed) {
                        handleDeleteUser(customer.id);
                        Swal.fire({
                          title: "Eliminato!",
                          text: "L'utente è stato cancellato",
                          icon: "success",
                        });
                      }
                    })
                  }
                >
                  Elimina
                </Button>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </>
  );
};

// ********************************** SERVICES *********************************

const ServiceContent = () => {
  const dispatch = useDispatch();
  const services = useSelector((state) => state.serviceReducer.services);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(getServices());
  }, [dispatch]);

  const filteredServices = services.filter((service) => {
    const durationString = String(service.duration);
    const priceString = String(service.price);

    return (
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      durationString.toLowerCase().includes(searchTerm.toLowerCase()) ||
      priceString.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleDeleteService = (serviceId) => {
    fetch(`http://localhost:3001/services/${serviceId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          // Se la richiesta è andata a buon fine, aggiorna lo stato dei servizi nel frontend
          dispatch(getServices());
        } else {
          // Se c'è stato un errore nella richiesta DELETE, gestiscilo di conseguenza
          console.error("Errore durante l'eliminazione del servizio");
        }
      })
      .catch((error) => {
        console.error("Errore durante la richiesta DELETE:", error);
      });
  };
  return (
    <>
      {" "}
      <h3 className="pt-5 text-center">Contenuto per Servizi</h3>
      <Row className=" d-flex align-items-center justify-content-center">
        <Col className="col-4">
          <InputGroup className="mb-3 mx-5">
            <FormControl
              placeholder="Cerca per nome, categoria, prezzo, ecc."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />{" "}
            <AddServiceModal></AddServiceModal>
          </InputGroup>{" "}
        </Col>
      </Row>
      <Row className="visible">
        {/* Mappa i risultati dei servizi */}
        {filteredServices.map((service) => (
          <Col
            key={service.id}
            className="col-4 d-flex flex-column justify-content-center align-items-center"
          >
            <div className="d-flex flex-column justify-content-center align-items-center py-5">
              {/* Puoi personalizzare i campi come preferisci */}
              <p>
                <b>Nome: {service.name}</b>
              </p>
              <p>Categoria: {service.category}</p>
              <p>Durata: {service.duration} minuti</p>
              <p>Prezzo: {service.price}€</p>
              <div className="d-flex ">
                <ModifyServiceModal serviceData={service} />

                <Button
                  color="danger"
                  className="m-2"
                  onClick={() =>
                    Swal.fire({
                      title: "Eliminare servizio?",
                      text: "Stai per cancellare definitivamente questo servizio",
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonColor: "#3085d6",
                      cancelButtonColor: "#d33",
                      confirmButtonText: "Elimina",
                      cancelButtonText: "Annulla",
                    }).then((result) => {
                      if (result.isConfirmed) {
                        handleDeleteService(service.id);
                        Swal.fire({
                          title: "Eliminato!",
                          text: "Il servizio è stato cancellato dal listino",
                          icon: "success",
                        });
                      }
                    })
                  }
                >
                  Elimina
                </Button>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </>
  );
};

// ************************************** PRODUCTS ******************************

const ProductContent = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products.filter((product) => {
    const stockString = String(product.stock);
    const priceString = String(product.price);

    return (
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stockString.toLowerCase().includes(searchTerm.toLowerCase()) ||
      priceString.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const handleDeleteProduct = (productId) => {
    fetch(`http://localhost:3001/products/${productId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          // Se la richiesta è andata a buon fine, aggiorna lo stato dei prodotti nel frontend
          dispatch(getProducts());
        } else {
          // Se c'è stato un errore nella richiesta DELETE, gestiscilo di conseguenza
          console.error("Errore durante l'eliminazione del prodotto");
        }
      })
      .catch((error) => {
        console.error("Errore durante la richiesta DELETE:", error);
      });
  };

  return (
    <>
      {" "}
      <h3 className="pt-5 text-center">Contenuto per Prodotti</h3>
      <Row className=" d-flex align-items-center justify-content-center">
        <Col className="col-4">
          <InputGroup className="mb-3 mx-5">
            <FormControl
              placeholder="Cerca per nome, categoria, prezzo, ecc."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />{" "}
            <AddProductModal />
          </InputGroup>{" "}
        </Col>
      </Row>
      <Row className="visible">
        {" "}
        {/* Mappa i risultati dei prodotti */}
        {filteredProducts.map((product) => (
          <Col className="col-4 d-flex flex-column justify-content-center align-items-center ">
            <div
              key={product.id}
              className="d-flex  flex-column justify-content-center align-items-center py-5"
            >
              <img
                src={product.imageUrl}
                alt="Product Image"
                style={{ width: "40px", height: "40px" }}
              />
              <p>
                <b>Nome: {product.name}</b>
              </p>
              <p>Descrizione: {product.description}</p>
              <p>Categoria: {product.category}</p>
              <p>Prezzo: {product.price}€</p>
              <p>Unità: {product.stock}</p>
              <div className="d-flex ">
                <ModifyProductModal productData={product} />
                <Button
                  color="danger"
                  className="m-2"
                  onClick={() =>
                    Swal.fire({
                      title: "Eliminare prodotto?",
                      text: "Stai per cancellare definitivamente questo prodotto",
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonColor: "#3085d6",
                      cancelButtonColor: "#d33",
                      confirmButtonText: "Elimina",
                      cancelButtonText: "Annulla",
                    }).then((result) => {
                      if (result.isConfirmed) {
                        handleDeleteProduct(product.id);
                        Swal.fire({
                          title: "Eliminato!",
                          text: "Il prodotto è stato cancellato dallo store",
                          icon: "success",
                        });
                      }
                    })
                  }
                >
                  Elimina
                </Button>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </>
  );
};

export { UserContent, ServiceContent, ProductContent };
