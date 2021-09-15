import React from "react";
import idGenerator from "react-id-generator";
import {Button,Table,Form} from "react-bootstrap"
import './Data.css'

export default class Data extends React.Component {
    constructor(props) {
        super()
  this.state = {
    datas: [],
    name: "",
    date: new Date(),
    profession: "",
    id: 0,
    create: true,

  };
  this.handleChangeselect = this.handleChangeselect.bind(this)
}

  
  handleChangeselect(e) {

    this.setState({ profession: e.target.value });
  }
  componentDidMount() {
    const data = [];
    this.setState({
      datas: data.map((event) => {
        return {
          name: event.name,
          date: event.date,
          profession: event.profession,
          id: idGenerator(),
        };
      }),
    });
  }

  handleChange = (e) => {
    const name = e.target.name;
    this.setState({ [name]: e.target.value });
  };

  handleCreateChange = () => {
    if (this.state.datas) {
      this.setState({
        datas: [
          ...this.state.datas,
          {
            name: this.state.name,
            date: this.state.date,
            profession: this.state.profession,
            id: idGenerator(),
          },
        ],
      });
    } else {
      this.setState({
        datas: [
          {
            name: this.state.name,
            date: this.state.date,
            profession: this.state.profession,
            id: idGenerator(),
          },
        ],
      });
    }
    this.setState({ name: "", date: "", profession: "" });
  };

  handleEdit = (e) => {
    const index = this.state.datas.find(function (event) {
      if (event.id === e.target.id) {
        return event;
      }
    });
    this.setState({
      name: index.name,
      date: index.date,
      profession: index.profession,
      id: index.id,

      create: false,
    });
  };
  handleDelete = (e) => {
    this.setState({
      datas: this.state.datas.filter(function (event) {
        if (event.id !== e.target.id) return e;
      }),
    });
  };
  handleUpdateChange = () => {
    const index = {
      name: this.state.name,
      date: this.state.date,
      profession: this.state.profession,
      id: this.state.id,
    };
    const datasupdated = this.state.datas.map((event) => {
      if (event.id === this.state.id) {
        return index;
      } else return event;
    });

    this.setState(() => ({
      datas: datasupdated,
      create: true,
      name: "",
      date: "",
      profession: "",
    }));
  };

  render() {
    const create = this.state.create ? "Add+" : "Update";
    const { datas } = this.state;
    const inputIsEmpty =
      this.state.name === "" ||
      this.state.profession === "Select" ||
      this.state.date === ""
        ? true
        : false;
    return (
      <div>
          <Form className="form">
          <Form.Label id="formlabel" column sm="4">Name:</Form.Label>
        <input id="formcontrol"
          style={{ width: 210}}
          type="text"
          placeholder="Enter name"
          onChange={this.handleChange}
          name="name"
          value={this.state.name}
        /><br/>
        <Form.Label id="formlabel" column sm="6">Date:</Form.Label>
        <input id="formdate"
          style={{ width: 210 }}
          type="date"
          placeholder=""
          onChange={this.handleChange}
          name="date"
          value={this.state.date}
        /><br/>
        <Form.Label id="label" column sm="5">Profession:</Form.Label>
        <select id="selectvalue"
          name="profession"
          onChange={this.handleChangeselect}
          value={this.state.profession}
        >
          <option value="Select">Select</option>

          <option value="Junior">Junior</option>
          <option value="Senior">Senior</option>
          <option value="Pro">Pro</option>


        </select><br/>

        <Button variant="primary"
          style={{ width: 150 }}
          disabled={inputIsEmpty}
          onClick={
            this.state.create
              ? this.handleCreateChange
              : this.handleUpdateChange
          }
        >
          {create}
        </Button>
        </Form>
        <br />
        <Table border="1" style={{ width: 400, paddingTop: 5 }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Date</th>
              <th>Profession</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {datas.map((entry, i) => {
              return (
                <tr key={i}>
                  <td>{entry.name}</td>
                  <td>{entry.date}</td>
                  <td>{entry.profession}</td>
                  <td>
                    <Button variant="secondary" onClick={this.handleEdit} id={entry.id}>
                      Edit
                    </Button>
                  </td>
                  <td>
                    <Button variant="danger" onClick={this.handleDelete} id={entry.id}>
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    );
  }
}
