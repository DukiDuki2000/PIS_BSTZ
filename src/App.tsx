import { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { UserProvider } from './components/UserContext'; // Importuj UserProvider
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AdminRoute from './components/AdminRoute';
import UserRoute from './components/UserRoute';
import ModRoute from "./components/ModRoute";

import * as PiIcons from 'react-icons/pi'
import AuthService from "./services/auth.service";
import IUser from './types/user.type';

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";

import BoardUser from "./components/board-user.component";
import BoardAdmin from "./components/board-admin.component";
import BoardMod from "./components/board-moderator.component";

import Footer from "./components/Footer";
import Books from './pages/Books';
import About_Us from "./pages/About_Us";
import SearchResults from './pages/SearchResults';

import Add_book from './pages/Add_book';
import EditBookSelection from './pages/Edit_book_selection';
import EditBook from './pages/Edit_book';
import Lend_To_User from './pages/Lend_to_user';

import EventBus from "./common/EventBus";

type Props = {};

type State = {
  showModeratorBoard: boolean,
  showAdminBoard: boolean,
  currentUser: IUser | undefined
}

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }

    EventBus.on("logout", this.logOut);
  }

  componentWillUnmount() {
    EventBus.remove("logout", this.logOut);
  }

  logOut() {
    AuthService.logout();
    this.setState({
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    });
  }

  render() {
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;

    return (
      <UserProvider>
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <Link to={"/"} className="navbar-brand">
              <PiIcons.PiBooks id="logo_books" size={40} />
              <span id="logo_text">Galaktyczne Lektury</span>
              <PiIcons.PiShootingStar id="logo_star" size={40} />
            </Link>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/home"} className="nav-link" style={{ color: 'white' }}>
                  Strona główna
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/about_us"} className="nav-link" style={{ color: 'white' }}>
                  O nas
                </Link>
              </li>

              {showModeratorBoard && (
                <li className="nav-item">
                  <Link to={"/mod"} className="nav-link" style={{ color: 'white' }}>
                    Panel moderacyjny
                  </Link>
                  <Link to={"/books"} className="nav-link" style={{ color: 'white' }}>
                    Książki
                  </Link>
                </li>
              )}

              {showAdminBoard && (
                <li className="nav-item">
                  <Link to={"/admin"} className="nav-link" style={{ color: 'white' }}>
                    Panel administracyjny
                  </Link>
                  <Link to={"/books"} className="nav-link" style={{ color: 'white' }}>
                    Książki
                  </Link>
                </li>
              )}

              {currentUser && (
                <li className="nav-item">
                  <Link to={"/user"} className="nav-link" style={{ color: 'white' }}>
                    Użytkownik
                  </Link>
                  <Link to={"/books"} className="nav-link" style={{ color: 'white' }}>
                    Książki
                  </Link>
                </li>
              )}
            </div>

            {currentUser ? (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/profile"} className="nav-link" style={{ color: 'white' }}>
                    {currentUser.username}
                  </Link>
                </li>
                <li className="nav-item">
                  <a href="/login" className="nav-link" onClick={this.logOut}>
                    Wyloguj
                  </a>
                </li>
              </div>
            ) : (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/login"} className="nav-link" style={{ color: 'white' }}>
                    Zaloguj
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/register"} className="nav-link" style={{ color: 'white' }}>
                    Rejestracja
                  </Link>
                </li>
              </div>
            )}
          </nav>

          {/* Przekierowania */}

          <div className="container mt-3">
            <Routes>
              {/* Home - all */}
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
              <Route path='/about_us' element={<About_Us />} />
              {/* <Route path='/books' element={<Books />} />
              <Route path='/search' element={<SearchResults />} /> */}
              {/* Userowe */}
              <Route path="/user" element={<UserRoute element={<BoardUser />} />} />
              <Route path='/books' element={<UserRoute element={<Books />} />} />
              <Route path='/search' element={<UserRoute element={<SearchResults />} />} />
              {/* Moderatorowe */}
              <Route path="/admin" element={<ModRoute element={<BoardMod />} />} />
              <Route path="/add_book" element={<ModRoute element={<Add_book />} />} />
              <Route path="/edit_book_selection" element={<ModRoute element={<EditBookSelection />} />} />
              <Route path="/edit_book/:bookId" element={<ModRoute element={<EditBook />} />} />
              {/* Adminowe */}
              <Route path="/admin" element={<AdminRoute element={<BoardAdmin />} />} />
              <Route path="/add_book" element={<AdminRoute element={<Add_book />} />} />
              <Route path="/edit_book_selection" element={<AdminRoute element={<EditBookSelection />} />} />
              <Route path="/edit_book/:bookId" element={<AdminRoute element={<EditBook />} />} />
            </Routes>
          </div>
          <Footer companyName="Firma Krzak Sp. z o.o." year={2024} />
          { /*<AuthVerify logOut={this.logOut}/> */}
        </div>
      </UserProvider>
    );
  }
}

export default App;
