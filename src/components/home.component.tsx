import { Component } from "react";

import UserService from "../services/user.service";

type Props = {};

type State = {
  content: string;
}

export default class Home extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    UserService.getPublicContent().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  render() {
    return (
        <div className='page_container'>
            <div className='text_container'>
                <h1>Galaktyczne lektury!</h1>
                <p>Witaj w bibliotece Galaktyczne Lektury. Tutaj znajdziesz wszystko co potrzebne ci jest do metody 3 razy Z!</p>
            </div>
            <div className='image_container'>
                <img src='/images/home-box.jpg' alt='Cezary Baryka' className='responsive_image'/>
            </div>
        </div>
    );
  }
}
