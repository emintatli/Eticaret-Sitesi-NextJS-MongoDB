import React from "react";
import Cards from "react-credit-cards";

export default class PaymentForm extends React.Component {
  state = {
    cvc: "",
    expiry: "",
    focus: "",
    name: "",
    number: "",
  };

  handleInputFocus = (e) => {
    this.setState({ focus: e.target.name });
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  };

  render() {
    return (
      <div id="PaymentForm">
        <Cards
          cvc={this.state.cvc}
          expiry={this.state.expiry}
          focused={this.state.focus}
          name={this.state.name}
          number={this.state.number}
          placeholders=""
          locale=""
        />
        <div className="card container mt-1">
            <div className="card-body">
          <div className="row">
            <div className="col">
              <input
              className="form-control m-1"
                type="tel"
                name="name"
                placeholder="Ad Soyad"
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
              />
            </div>
            <div className="col">
              <input
              className="form-control m-1"
                type="tel"
                name="number"
                placeholder="Kart Numarası"
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
              />
            </div>
            </div>
            <div className="row">
              <div className="col">
                <input
                className="form-control m-1"
                  type="tel"
                  name="expiry"
                  placeholder="01/22"
                  onChange={this.handleInputChange}
                  onFocus={this.handleInputFocus}
                />
              </div>
              <div className="col">
                <input
                className="form-control m-1"
                  type="tel"
                  name="cvc"
                  placeholder="CVC"
                  onChange={this.handleInputChange}
                  onFocus={this.handleInputFocus}
                />
              </div>
            </div>
            </div>
        </div>
        
      </div>
    );
  }
}
