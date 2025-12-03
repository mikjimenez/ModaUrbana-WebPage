import { Navbar, Container, Nav, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useCart } from '../context/AppContext';

function NavBar(){
    const { cartCount } = useCart();
    return (
    <header className="site-header">
        <Navbar expand="md" className="mb-3 border-bottom">
        <Container>
            {/* Logo */}
            <Navbar.Brand as={Link} to="/">
                <img 
                    src="https://scontent-scl3-1.xx.fbcdn.net/v/t1.15752-9/566526660_1819530615594955_7959325210578501299_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=0024fc&_nc_ohc=x8ZGuT26GYIQ7kNvwH4l5iz&_nc_oc=AdnyJsBL8AckO-DqRO4Mbs27etF_6Wp6ryUiEi_41n2uZsLkemrVfQYjwTgPv26B1Mg1FUNUMqns8XJXL6i6CgGM&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent-scl3-1.xx&oh=03_Q7cD3gGkslVnY24-wM_WBto3cNVJIzIu3XGwtOVvzsM6FagZOw&oe=69263270" 
                    alt="Logo ModaUrbanaSPA" 
                    style={{ width: '120px' }} 
                />
            </Navbar.Brand>
            
            <Navbar.Toggle />
            
            <Navbar.Collapse>
                <Nav className="me-auto">
                    <Nav.Link as={Link} to="/" style={{ color: '#ffffff', fontStyle: 'normal' }}>
                        INICIO
                    </Nav.Link>
                    <Nav.Link as={Link} to="/productos" style={{ color: '#ffffff', fontStyle: 'normal' }}>
                        PRODUCTOS
                    </Nav.Link>
                    <Nav.Link as={Link} to="/contacto" style={{ color: '#ffffff', fontStyle: 'normal' }}>
                        CONTACTO
                    </Nav.Link>
                </Nav>
                
                <Nav>
                    <Nav.Link as={Link} to="/productos"> 
                        🛒 <Badge bg="primary" pill>{cartCount}</Badge>
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
    </header>
    );
}

export default NavBar;