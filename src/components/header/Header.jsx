import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Navbar,
  Nav,
  NavDropdown,
  Button,
  Modal,
  Container,
  Form,
} from "react-bootstrap";
import logoFoton from "../../assets/foton-logo-h-nobg.png";
import logoBahiaMobility from "../../assets/logo-bahia-mobility.png";
import { getCategories } from "../../services/services";
import "./Header.css";

const Header = ({ onSectionChange }) => {
  const [categories, setCategories] = useState([]);
  const [showCategories, setShowCategories] = useState(false);
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const [selectedSection, setSelectedSection] = useState("inicio"); // Se inicializa selectedSection con "inicio"
  const location = useLocation();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await getCategories();
        categoriesData.sort((a, b) => a.name.localeCompare(b.name));
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []); // Llamada inicial para obtener las categorías

  useEffect(() => {
    updateSelectedSection();
  }, [location, categories]); // Se ejecuta cuando cambia la ubicación o las categorías


  const updateSelectedSection = () => {
    const pathname = decodeURIComponent(location.pathname);
    if (pathname === "/") {
      setSelectedSection("inicio");
    } else if (pathname === "/post-venta") {
      setSelectedSection("post-venta");
    } else if (pathname === "/usados") {
      setSelectedSection("usados");
    } else if (pathname === "/contacto") {
      setSelectedSection("contacto");
    } else if (pathname === "/nosotros") {
      setSelectedSection("nosotros");
    } else {
      const category = categories.find(
        (cat) => `/nuestros-vehiculos/${cat.name.toLowerCase()}` === pathname
      );
      if (category) {
        onSectionChange(category.name);
        setSelectedSection(category.name);
      } else {
        setSelectedSection("");
      }
    }
  };

  const handleCategoryClick = () => {
    setShowCategories(!showCategories);
  };

  const handleNavToggleClick = () => {
    setIsNavExpanded(!isNavExpanded);
    setShowCategories(false);
  };

  const handleSectionClick = (section) => {
    onSectionChange(section);
    if (window.innerWidth <= 992) {
      setIsNavExpanded(false);
    }
    setShowCategories(false);
  };

  const handleCotizarClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const scrollToTop = () => {
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100); // Retraso de 100 milisegundos
  }

  return (
    <header>
      <div className="d-flex flex-row justify-content-between header-logo align-items-center">
        <Link to="/">
          <img src={logoFoton} alt="Logo Foton" width={150} />
        </Link>
        <h1>CONCESIONARIO OFICIAL</h1>
        <img className="logo-bahia" src={logoBahiaMobility} alt="Logo Bahia Mobility" width={150} />
      </div>
      <div className="m-0 p-0 ">
        <Navbar
          variant="dark"
          expand="lg"
          className="mobile-navbar"
          expanded={isNavExpanded}
        >
          <Navbar.Toggle
            aria-controls="responsive-navbar-nav"
            onClick={handleNavToggleClick}
          />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto responsive-nav d-flex align-items-center">
              <Nav.Link
                as={Link}
                to="/"
                className={(selectedSection === 'inicio') ? 'active' : null}
                onClick={() => {
                  handleSectionClick("inicio");
                  scrollToTop();
                  } 
                }
              >
                Inicio
              </Nav.Link>
              <div className="vehiculos-dropdown-container d-lg-none">
                <div
                  className="nav-link dropdown-toggle custom-button vehiculos-dropdown"
                  onClick={handleCategoryClick}
                >
                  Nuestros Vehículos
                </div>
                {showCategories && (
                  <Nav className="mr-auto show-categories flex-column align-items-center">
                    {categories && categories.map((category) => (
                      <Nav.Link
                        key={category._id}
                        as={Link}
                        to={`/nuestros-vehiculos/${category.name.toLowerCase()}`}
                        className={(selectedSection === category.name) ? 'active' : null}
                        onClick={() => {
                          handleSectionClick(category.name);
                          handleCategoryClick();
                          scrollToTop();
                        }}
                      >
                        {category.name}
                      </Nav.Link>
                    ))}
                  </Nav>
                )}
              </div>
              <NavDropdown
                title="Nuestros Vehículos"
                className="d-none d-lg-block vehiculos-dropdown"
                onClick={handleCategoryClick}
              >
                {categories && categories.map((category) => (
                  <NavDropdown.Item
                    key={category._id}
                    as={Link}
                    to={`/nuestros-vehiculos/${category.name.toLowerCase()}`}
                    className={(selectedSection === category.name) ? 'active' : null}
                    onClick={() => {
                      handleSectionClick(category.name);
                      handleCategoryClick();
                      scrollToTop();
                    }}
                  >
                    {category.name}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>
              <Nav.Link
                as={Link}
                to="/post-venta"
                className={(selectedSection === "post-venta") ? "active" : null}
                onClick={() => {
                  handleSectionClick("post-venta");
                  scrollToTop();
                  }
                }
              >
                Post Venta
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/usados"
                className={(selectedSection === "usados") ? "active" : null}
                onClick={() => {
                  handleSectionClick("usados");
                  scrollToTop();
                  } 
                }
              >
                Usados
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/contacto"
                className={selectedSection === "contacto" ? "active" : null}
                onClick={() => {
                  handleSectionClick("contacto");
                  scrollToTop();
                  }
                }

              >
                Contacto
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/nosotros"
                className={(selectedSection === "nosotros") ? "active" : null}
                onClick={() => {
                  handleSectionClick("nosotros");
                  scrollToTop();
                  }
                }
              >
                Sobre Nosotros
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </header>
  );
};

export default Header;
