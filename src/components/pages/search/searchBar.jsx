import React from 'react';
import { Component } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';

class SearchBar extends Component {
    state = {
        cSelected: [],
        value : "",
        name: false,
        major: false,
        bio: false
    }
  
    submit = e => {
        e.preventDefault();

        const nameString = this.state.name ? '&name=True' : '';
        const majorString = this.state.major ? '&major=True' : '';
        const bioString = this.state.bio ? '&bio=True' : '';

        const URL=`${this.state.value}${nameString}${majorString}${bioString}`;

        console.log(URL);

        this.props.handleSearch(URL);
    }
    
    handleChange = e => {
        e.preventDefault();

        this.setState({
            value: e.target.value,
        });
    }

    onCheckboxBtnClick = selected => {
        var index = this.state.cSelected.indexOf(selected);
        var newSelected = [...this.state.cSelected];

        if (index < 0) {
          newSelected.push(selected);
        } else {
          newSelected.splice(index, 1);
        }

        this.setState({ cSelected: [...newSelected] });

        switch (selected) {
            case 1:
                this.setState({ name: !this.state.name });
                break;
            case 2:
                this.setState({ major: !this.state.major });
                break;
            case 3:
                this.setState({ bio: !this.state.bio });
                break;
            default:
                break;
        }
      }

    render() {
        return (
            <div>
                <div className="search--search-container">
                    <form className="search--animated" onSubmit={this.submit}>
                        <input 
                            className="field--input" 
                            type="text" 
                            placeholder="Search by name, major, or bio..." 
                            value={this.state.value}
                            onChange={this.handleChange}
                            required
                        />                 
                    </form>  
                </div>
                <br></br>
                <br></br>
                <p style={{fontWeight: 'bold', display: 'flex', justifyContent: 'center'}}>Filter by: </p>
                <br></br>
                <div className="filter" style={{display: 'flex', justifyContent: 'center'}}>
                    <ButtonGroup>
                      <Button outline color="info" onClick={() => this.onCheckboxBtnClick(1)} active={this.state.cSelected.includes(1)}>Name</Button>
                      <Button outline color="info" onClick={() => this.onCheckboxBtnClick(2)} active={this.state.cSelected.includes(2)}>Major</Button>
                      <Button outline color="info" onClick={() => this.onCheckboxBtnClick(3)} active={this.state.cSelected.includes(3)}> Bio</Button>
                    </ButtonGroup>
                </div> 
            </div>
        );
    }
}

export default SearchBar;
