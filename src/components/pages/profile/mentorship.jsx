import React from 'react';

import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import {TextField, MenuItem, Chip}  from '@material-ui/core';

import { Button, Form, Alert} from 'react-bootstrap';

import classNames from 'classnames';
import { isatty } from 'tty';

import Divider from '../../util/divider';

import majors from '../../../majors.json';


const styles = {
    toggle: {
        width: 44,
        height: 23,
    },
    thumbOff: {
        backgroundColor: '#ffcccc',
    },
    trackOff: {
        backgroundColor: '#ff9d9d',
    },
    thumbSwitched: {
        backgroundColor: 'red',
    },
    trackSwitched: {
        backgroundColor: '#ff9d9d',
    },
    labelStyle: {
        color: 'red',
    },
    update_button: {
        margin: "0px"
    },
    textfield: {
        height: 40,
        textAlign: "center",
    },
    textfield_input: {
        borderColor: '#007bff'
    },
    blurb: {
        paddingLeft:"4%",
        margin:"2%",
        lineHeight:"1.5em",
        fontSize: "90%"
    },
    chip: {
        margin: 4,
      },
      wrapper: {
        display: 'flex',
        flexWrap: 'wrap',
      },

};

class Mentorship extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bioOpen: false,
                        prosOpen: false,
                        consOpen: false,
                        clubsOpen: false,
            classesOpen: false,
            majorOpen: false,
            bio: props.mentor.bio,
                        pros: props.mentor.pros,
                        cons: props.mentor.cons,
                        clubs: props.mentor.clubs,
            courses: props.mentor.courses ? props.mentor.courses.map(obj => obj.name) : []
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            bio: nextProps.mentor.bio,
            pros: nextProps.mentor.pros,
            cons: nextProps.mentor.cons,
            clubs: nextProps.mentor.clubs,
            courses: nextProps.mentor.courses.map(obj => obj.name)
        });
    }


    openField = field => {
        this.setState({
            [field]: !this.state[field]
        });
    }

    handleRequestAdd (chip) {
        this.setState({
          courses: [...this.state.courses, chip]
        })
      }

    handleRequestDelete (deletedChip) {
          this.setState({
            courses: this.state.courses.filter((c) => c !== deletedChip)
          })
      }

    renderEditClasses = () => {
        return (
            <div className="add-classes">
                <ChipInput
                    fullWidth={true}
                    underlineFocusStyle={styles.textfield_input}
                    value={this.state.courses}
                      onRequestAdd={(chip) => this.handleRequestAdd(chip)}
                      onRequestDelete={(deletedChip) => this.handleRequestDelete(deletedChip)}
                />
                <div className="buttons">
                    <Button
                        color="primary"
                        onClick={() => this._updateClasses()}
                        size="sm"
                    >
                        Save
                    </Button>
                    <Button
                        color="secondary"
                        onClick={() => this.openField("classesOpen")}
                        size="sm"
                    >
                        Cancel
                    </Button>
                </div>
            </div>
        );
    }

    renderClasses = () => {
        if (!this.props.mentor.courses) {
            return null;
        }

        if (!this.props.mentor.courses.length) {
            if (!this.state.classesOpen) {
                return (
                    <p onClick={() => this.openField("classesOpen")}>
                        <i className="fa fa-plus" aria-hidden="true"></i>
                        &nbsp;Add Classes
                    </p>
                );
            } else {
                return this.renderEditClasses();
            }
        } else {
            if (!this.state.classesOpen) {
                let key = 0;
                return (
                    <div className="text-and-edit">
                        <div className="courses">
                            {this.props.mentor.courses.map(course => {
                                key += 1;
                                return (
                                    <Chip style={styles.chip} key={key}>{course.name}</Chip>
                                );
                            })}
                        </div>
                        <i className="fa fa-pencil-square-o" style={{paddingTop:"3%"}} onClick={() => this.openField("classesOpen")}></i>
                    </div>
                );
            } else {
                return this.renderEditClasses();
            }
        }
    }

    _updateBio = () => {
        this.openField("bioOpen");
        this.props.updateProfile("bio", this.state.bio);
    }

        _updatePros = () => {
                this.openField("prosOpen");
                this.props.updateProfile("pro", this.state.pros);
        }

        _updateCons = () => {
                this.openField("consOpen");
                this.props.updateProfile("cons", this.state.cons);
        }

        _updateClubs = () => {
                this.openField("clubsOpen");
                this.props.updateProfile("clubs", this.state.clubs);
        }

    _updateClasses = () => {
        this.openField("classesOpen");
        this.props.updateProfile("courses", this.state.courses.map(function(str){
            return ({name: str})
        }));
    }


    renderEditBio = () => {
        return (
            <div className="add-bio">
                <Form.Control type="textarea" onChange={e => this.setState({bio: e.target.value})} value={this.state.bio} name="bio" id="bio" />
                <div className="buttons">
                    <Button
                        color="primary"
                        onClick={() => this._updateBio()}
                        size="sm"
                    >
                        Save
                    </Button>
                    <Button
                        color="secondary"
                        onClick={() => this.openField("bioOpen")}
                        size="sm"
                    >
                        Cancel
                    </Button>
                </div>
            </div>
        );
    }

    renderBio = () => {
        if (!this.props.mentor.bio) {
            if (!this.state.bioOpen) {
                return (
                    <p onClick={() => this.openField("bioOpen")}>
                        <i className="fa fa-plus" aria-hidden="true"></i>
                        &nbsp;Add a bio
                    </p>
                );
            } else {
                return this.renderEditBio();
            }
        } else {
            if (!this.state.bioOpen) {
                return (
                    <div className="text-and-edit">
                        <p>{this.props.mentor.bio}</p>
                        <i className="fa fa-pencil-square-o" onClick={() => this.openField("bioOpen")}></i>
                    </div>
                );
            } else {
                return this.renderEditBio();
            }
        }
    }


        renderEditPros = () => {
        return (
            <div className="add-pros">
                <Form.Control type="textarea" onChange={e => this.setState({pros: e.target.value})} value={this.state.pros} name="pros" id="pros" />
                <div className="buttons">
                    <Button
                        color="primary"
                        onClick={() => this._updatePros()}
                        size="sm"
                    >
                        Save
                    </Button>
                    <Button
                        color="secondary"
                        onClick={() => this.openField("prosOpen")}
                        size="sm"
                    >
                        Cancel
                    </Button>
                </div>
            </div>
        );
    }

    renderPros = () => {
        if (!this.props.mentor.pros) {
            if (!this.state.prosOpen) {
                return (
                    <p onClick={() => this.openField("prosOpen")}>
                        <i className="fa fa-plus" aria-hidden="true"></i>
                        &nbsp;Add pros
                    </p>
                );
            } else {
                return this.renderEditPros();
            }
        } else {
            if (!this.state.prosOpen) {
                return (
                    <div className="text-and-edit">
                        <p>{this.props.mentor.pros}</p>
                        <i className="fa fa-pencil-square-o" onClick={() => this.openField("prosOpen")}></i>
                    </div>
                );
            } else {
                return this.renderEditPros();
            }
        }
    }

        renderEditCons = () => {
                return (
                        <div className="add-cons">
                                <Form.Control type="textarea" onChange={e => this.setState({cons: e.target.value})} value={this.state.cons} name="cons" id="cons" />
                                <div className="buttons">
                                        <Button
                                                color="primary"
                                                onClick={() => this._updateCons()}
                                                size="sm"
                                        >
                                                Save
                                        </Button>
                                        <Button
                                                color="secondary"
                                                onClick={() => this.openField("consOpen")}
                                                size="sm"
                                        >
                                                Cancel
                                        </Button>
                                </div>
                        </div>
                );
        }

        renderCons = () => {
                if (!this.props.mentor.cons) {
                        if (!this.state.consOpen) {
                                return (
                                        <p onClick={() => this.openField("consOpen")}>
                                                <i className="fa fa-plus" aria-hidden="true"></i>
                                                &nbsp;Add cons
                                        </p>
                                );
                        } else {
                                return this.renderEditCons();
                        }
                } else {
                        if (!this.state.consOpen) {
                                return (
                                        <div className="text-and-edit">
                                                <p>{this.props.mentor.cons}</p>
                                                <i className="fa fa-pencil-square-o" onClick={() => this.openField("consOpen")}></i>
                                        </div>
                                );
                        } else {
                                return this.renderEditCons();
                        }
                }
        }

        renderEditClubs = () => {
                return (
                        <div className="add-clubs">
                                <Form.Control type="textarea" onChange={e => this.setState({clubs: e.target.value})} value={this.state.clubs} name="clubs" id="clubs" />
                                <div className="buttons">
                                        <Button
                                                color="primary"
                                                onClick={() => this._updateClubs()}
                                                size="sm"
                                        >
                                                Save
                                        </Button>
                                        <Button
                                                color="secondary"
                                                onClick={() => this.openField("clubsOpen")}
                                                size="sm"
                                        >
                                                Cancel
                                        </Button>
                                </div>
                        </div>
                );
        }

        renderClubs = () => {
                if (!this.props.mentor.clubs) {
                        if (!this.state.clubsOpen) {
                                return (
                                        <p onClick={() => this.openField("clubsOpen")}>
                                                <i className="fa fa-plus" aria-hidden="true"></i>
                                                &nbsp;Add clubs
                                        </p>
                                );
                        } else {
                                return this.renderEditClubs();
                        }
                } else {
                        if (!this.state.clubsOpen) {
                                return (
                                        <div className="text-and-edit">
                                                <p>{this.props.mentor.clubs}</p>
                                                <i className="fa fa-pencil-square-o" onClick={() => this.openField("clubsOpen")}></i>
                                        </div>
                                );
                        } else {
                                return this.renderEditClubs();
                        }
                }
        }


    _updateMajor = major => {
        this.openField("majorOpen");
        this.props.updateProfile("major", {name: major})
    }

    renderEditMajor = () => {
        let value = 1;
        return (
            <div className="add-major">
                <SelectField
                    value={this.props.mentor.major ? this.props.mentor.major.name : null}
                    style={styles.textfield}
                    onChange={(e, key, value) => this._updateMajor(value)}
                >
                    {majors.sort().map(major => {
                        value += 1;
                        return (
                            <MenuItem
                                key={value}
                                value={major}
                                primaryText={major}
                            />
                        );
                    })}
                </SelectField>
                <div className="buttons">
                    <Button
                        color="secondary"
                        onClick={() => this.openField("majorOpen")}
                        size="sm"
                    >
                        Cancel
                    </Button>
                </div>
            </div>
        );

    }

    renderMajor = () => {
        if (!this.props.mentor.major) {
            if (!this.state.majorOpen) {
                return (
                    <p onClick={() => this.openField("majorOpen")}>
                        <i className="fa fa-plus" aria-hidden="true"></i>
                        &nbsp;Add Major
                    </p>
                );
            } else {
                return this.renderEditMajor();
            }
        } else {
            if (!this.state.majorOpen) {
                return (
                    <div className="text-and-edit">
                        <p>{this.props.mentor.major.name}</p>
                        <i className="fa fa-pencil-square-o" onClick={() => this.openField("majorOpen")}></i>
                    </div>
                );
            } else {
                return this.renderEditMajor();
            }
        }
    }

    render() {
        const isActive = this.props.mentor.active;

        let notAmb =
        <Alert color="secondary">
            <ul style={styles.blurb}>
                <li>If you have declared your major, you can become an ambassador, and help out fellow bruins.</li>
                <li>As an ambassador you will meet with with undeclared or undecided students, who wants to hear about
                    your major over a cup of coffee/tea.</li>
                <li>Meet with as many or as few students as you want. They will really
                    appreciate your help, when deciding on their major.</li>
            </ul>
        </Alert>

         let isAmb =
        <div className={classNames({'disabled': !isActive}, 'mentor-fields')}>
            <div className="major">
                <h2>Major</h2>
                <Divider orientation={"horizontal"} />
                {this.renderMajor()}
            </div>
            <div className="bio">
                <h2>Bio</h2>
                <Divider orientation={"horizontal"} />
                {this.renderBio()}
            </div>
            <div className="classes-taken">
                <h2>Classes Taken:</h2>
                <Divider orientation={"horizontal"} />
                {this.renderClasses()}
            </div>
        </div>


        return(
            <MuiThemeProvider>
                <div className="mentorship">
                    <div className="heading">
                        <i className="fa fa-users fa-lg" aria-hidden="true"></i>
                        <h1>Ambassador</h1>
                    </div>
                    <div className="body">
                        <div className="mentorship-status">
                            <h2>Ambassador Status:</h2>
                            <Toggle
                                id="status"
                                toggled={isActive}
                                onToggle={this.props.updateMentorStatus}
                                style={styles.toggle}
                            />
                        </div>

                        <div>
                            { !isActive
                                ? notAmb
                                : isAmb
                            }
                        </div>

                    </div>
                    {/*
                    <div className="banner">
                        <p>Are you an upperclassman who's passionate about your major? Become a mentor and spread your wisdom!</p>
                    </div>
                    */}
                </div>
            </MuiThemeProvider>
        );
    }
}

export default Mentorship;
