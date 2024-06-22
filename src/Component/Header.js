// Header.js
import React from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ImageView from '../Component/ImageView'; // Assuming you have an ImageView component
import GlobalImages from '../GlobalClasses/GlobalImages'; // Assuming you have a GlobalImages file
import COLORS from '../Constants/colors';

const Header = ({ showSearch = true, showIcons = true }) => {
    const insets = useSafeAreaInsets();

    return (
        <View style={{
            width: '100%', height: showSearch ? 100 : 50, backgroundColor: '#035772',
            paddingTop: insets.top,
            paddingLeft: insets.left,
            paddingRight: insets.right,
            alignItems: 'center',
            justifyContent: 'flex-start'
        }}>
            <View style={{ flex: 1, height: 60, flexDirection: 'row', width: '100%', justifyContent: 'space-between', gap: 10 }}>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                    <ImageView
                        image={GlobalImages.sideMenu}
                        height={25}
                        width={25}
                        marginLeft={10}
                        tintColor={'white'}
                    />
                    <ImageView
                        image={GlobalImages.PrjnaaLogo}
                        height={30}
                        width={120}
                        marginLeft={10}
                    />
                </View>

                {showIcons && (
                    <View style={{ flex: 0.5, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginRight: 10 }}>
                        {showIcons && (
                            <>
                                <ImageView
                                    image={GlobalImages.ProfileImg}
                                    height={20}
                                    width={20}
                                    tintColor={'white'}
                                    marginLeft={10}
                                />
                                <ImageView
                                    image={GlobalImages.Wishlist}
                                    height={20}
                                    width={20}
                                    tintColor={'white'}
                                    marginLeft={10}
                                />
                                <ImageView
                                    image={GlobalImages.cart}
                                    height={20}
                                    width={20}
                                    tintColor={'white'}
                                    marginLeft={10}
                                />
                            </>
                        )}
                    </View>
                )}
            </View>

            {showSearch && (
                <View style={{
                    flexDirection: 'row',
                    flex: 1, height: 40, flexDirection: 'row', width: '93%', justifyContent: 'center', alignSelf: 'center',
                    backgroundColor: 'white', marginTop: 10, marginBottom: 10,
                    borderRadius: 25, overflow: 'hidden'
                }}>
                    <TextInput
                        style={{ flex: 1, marginLeft: 15, color: COLORS.black, alignItems: 'center', fontSize: 13 }}
                        placeholder='Search for products, categories & brands...'
                        placeholderTextColor={COLORS.grey}

                    />
                    <TouchableOpacity style={{ width: 65, backgroundColor: '#1c2629', alignItems: 'center', justifyContent: 'center' }}>
                        <ImageView
                            image={GlobalImages.search}
                            height={18}
                            width={18}
                            tintColor={'white'}
                        />
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

export default Header;
