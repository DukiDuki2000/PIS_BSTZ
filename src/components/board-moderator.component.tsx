import { Component } from "react";
import { Link } from 'react-router-dom';
import UserService from "../services/user.service";
import EventBus from "../common/EventBus";

type Props = {};

type State = {
  content: string;
}

export default class BoardAdmin extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    UserService.getModeratorBoard().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
  }

  render() {
    return (
      <div className='page_container'>
            <div className='text_container'>
                <h1>Galaktyczne lektury!</h1>
                <p>System administracyjny - Galaktyczne Lektury</p>
            </div>
            <div className="tile_container">
                <Link to='/edit_book_selection' className='tile'>
                    <div className="tile_content">
                        <h2>Lista książek + edycja</h2>
                    </div>
                </Link>
                <Link to='/add_book' className='tile'>
                    <div className="tile_content">
                        <h2>Dodawanie książek</h2>
                    </div>
                </Link>
            </div>   
        </div>
    );
  }
}
