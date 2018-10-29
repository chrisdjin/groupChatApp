

import React from 'react'
import { Text, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import { Container, Header, Content, Tab, Tabs, View, Icon, TabHeading } from 'native-base';
// import firebase from 'react-native-firebase'
import Chat from '../components/Chat'
import Group from '../components/Groups'
import Admin from '../components/Admin'
import {clearState} from '../action'
const { height, width, fontScale } = Dimensions.get("window")


class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabs: null
        }
    }
    componentDidMount(){
        setTimeout(() => {
            if (this.tabRef) { this.setState({ tabs: this.tabRef }) }
        }, 0)
    }
    // tabChangeClick(){
    //     this.props.clearState()

    // }

    render() {
        const user = this.props.logUser && this.props.logUser.user
        return (
            <Tabs  ref={(ref) => { this.tabRef = ref; }}  tabBarPosition="bottom">

                <Tab heading={<TabHeading><Icon name="chatbubbles" /></TabHeading>}>
                    <Chat navigation={this.props.navigation} tabRef={this.state.tabs} />
                </Tab>
                <Tab  heading={<TabHeading><Icon name="people" /></TabHeading>}>
                    <Group tabRef={this.state.tabs} />
                </Tab>
                {
                    user === "superUser" ?
                        <Tab heading={<TabHeading><Icon name="person-add" /></TabHeading>}>
                            <Admin tabRef={this.state.tabs} />
                        </Tab>
                        : null
                }
            </Tabs>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        logUser: state.Signin.logUser,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        clearState: () => dispatch(clearState())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)