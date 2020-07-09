import React, { Component } from 'react'

import { View, Text, ScrollView, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { connect } from 'react-redux';

import { fetchListItems } from '../redux/actions/actions'

class HomeScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            posts: [],
            page: 0
        }
    }
    componentDidMount() {
        this.props.getData(0);

        this.interval = setInterval(() => {
            this.props.getData(this.state.page)
        }, 10000)

    }

    static getDerivedStateFromProps(nextProps, state) {
        return {
            posts: nextProps.listData.listItems,
            page: nextProps.listData.pageNo
        }
    }


    _renderDetails = (item) => {
        this.props.navigation.navigate("Details", { data: item })
    }

    _renderPagination = () => {
        this.props.getData(this.state.page)
    }
    render() {

        return (

            <View style={styles.container}>
                <FlatList
                    data={this.state.posts}
                    renderItem={({ item }) => (<RowItem item={item} details={(item) => this._renderDetails(item)} />)}
                    keyExtractor={item => item.id}
                    onEndReached={this._renderPagination}
                    onEndReachedThreshold={0}
                    ItemSeparatorComponent={() => (<View style={{ width: '100%', height: 1, backgroundColor: 'gray' }} />)}
                />
            </View>
        )
    }
}

export const RowItem = (props) => {
    return (
        <TouchableOpacity style={styles.RowItem} onPress={() => props.details(props.item)}>
            <Text style={styles.header}>{props.item.title}</Text>
            <Text style={styles.subHeader}>Created At <Text style={styles.txt_Style}>{props.item.created_at}</Text></Text>
            <Text style={styles.subHeader}>Author <Text style={styles.txt_Style}>{props.item.author}</Text></Text>
            <Text style={styles.subHeader}>URL <Text style={styles.txt_Style}>{props.item.url}</Text></Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    RowItem: {
        height: 200
    },
    header: {
        fontSize: 16,
        fontWeight: 'bold',
        padding: 10
    },
    subHeader: {
        fontSize: 15,
        fontWeight: 'bold',
        padding: 10
    },
    txt_Style: {
        fontSize: 15,
        fontWeight: 'normal'
    }
})


const mapStateToProps = state => {
    return {
        listData: state.listItems,
        pageNumber: state.listItems.pageNo
    }
}


const mapDispatchToProps = dispatch => {
    return {
        getData: (pageNo) =>
            dispatch(fetchListItems(pageNo))
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)