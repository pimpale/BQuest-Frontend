import React from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import majors from '../../majors';

/**
 * The input is used to create the `dataSource`, so the input always matches three entries.
 */

const styles = {
    borderColor: "#007bff"
}

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.majors = majors.sort()
    }

    state = {
        dataSource: [],
    };

    onNewRequest = (searchText, dataSource, params) => {
        this.props.handleSearch(searchText);
    }

    render() {
        return (
            <MuiThemeProvider>
                <div className="search-bar">
                    <AutoComplete
                        hintText="Search by major..."
                        dataSource={this.majors}
                        fullWidth={true}
                        filter={AutoComplete.caseInsensitiveFilter}
                        maxSearchResults={5}
                        onNewRequest={this.onNewRequest}
                        underlineFocusStyle={styles}
                        ref='searchInputField'
                    />
                </div>
            </ MuiThemeProvider>
        );
    }
}

export default Search;
