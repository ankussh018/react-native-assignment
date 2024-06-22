import React from 'react';
import { FlatList, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ImageView from './ImageView';


const TwoColumnList = ({ data }) => {
    const renderListItem = ({ item, index }) => (
        <TouchableOpacity activeOpacity={0.8} style={[styles.listItem, { marginRight: index === data.length - 1 ? 10 : 0 }]}>
            <View style={{ width: '100%', height: 175, padding: 10 }}>
                <ImageView
                    image={{ uri: item.media.mainMedia.image.url }}
                    height={'100%'}
                    width={'100%'}
                    resizeMode={'cover'}
                    radius={5}
                /> 
                {
                    item.discount.value != 0 && (
                        <View style={{ position: 'absolute', height: 25, backgroundColor: 'green', top: 20, paddingHorizontal: 10, borderTopRightRadius: 10, borderBottomRightRadius: 10, }}>
                            <Text style={{ fontWeight: '800', fontSize: 18, color: 'white' }}>{`${item.discount.value}% OFF`}</Text>
                        </View>)
                }
            </View>

            <View style={{ flex: 1, paddingHorizontal: 10, marginTop: 5, justifyContent: 'space-between' }}>
                <Text style={{ color: 'black' }}>{item.name}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', marginTop: 5, justifyContent: 'flex-end' }}>
                    <Text style={{ fontWeight: '800', fontSize: 18, color: 'black' }}>{item.convertedPriceData.formatted.discountedPrice}</Text>
                    < Text style={{ textDecorationLine: 'line-through', marginLeft: 10, color: 'grey' }}>{item.convertedPriceData.formatted.price}</Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', gap: 10, marginHorizontal: 10, marginTop: 5 }}>

                <View style={{ flex: 1, height: 30, backgroundColor: 'blue', justifyContent: 'center', alignItems: 'center', borderRadius: 4 }}>
                    <Text style={{ fontWeight: '800', fontSize: 15, color: 'white' }}>{'Cart'}</Text>
                </View>

                <View style={{ flex: 1, height: 30, backgroundColor: 'orange', justifyContent: 'center', alignItems: 'center', borderRadius: 4 }}>
                    <Text style={{ fontWeight: '800', fontSize: 15, color: 'white' }}>{'Buy'}</Text>
                </View>

            </View>

        </TouchableOpacity>
    );

    return (
        <FlatList
            data={data}
            renderItem={renderListItem}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            contentContainerStyle={styles.listContainer}
            scrollEnabled={false}
        />
    );
};

const styles = StyleSheet.create({

    listContainer: {
        flex: 1,
        gap: 10,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 20

    },

    listItem: {
        flex: 0.5,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: 'white',
        borderRadius: 8,
        marginHorizontal: 10,
        borderWidth: 1,
        borderColor: '#D9D9D9',
        elevation: 6,
        paddingBottom: 10,
    },

});

export default TwoColumnList;
