import { Component } from "react";

import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import { Link } from 'react-router-dom';

import Go_back from './Go_back'

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
    UserService.getAdminBoard().then(
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
                <Link to='/lend' className='tile'>
                    <div className="tile_content">
                        <h2>Wypożyczenie lokalne</h2>
                    </div>
                </Link>
            </div>   
        </div>
    );
  }
}
