import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, SafeAreaView, Linking } from 'react-native';
import { Feather } from '@expo/vector-icons';
import HeaderComponent from './Components/Main/HeaderComponent';
import FooterComponent from './Components/Main/FooterComponent';

const Weblinks = ({ navigation }) => {

    const concepts = [
        {
            id: 0,
            image: require('./assets/schemes.jpg'), 
            url: 'https://www.telangana.gov.in/', 
        },
        {
            id: 1,
            title: 'Dalit Bandhu',
            image: require('./assets/dalit_bandhu.jpg'),
            matter:
                "The Telangana Government has recently embarked on a magnanimous journey to solve the issues and problems faced by the Dalits in the State with the introduction of ‘Dalit Bandhu Scheme’. The scheme provides a one-time grant of Rs. 10,00,000/- to the beneficiaries thereby instilling a sense of financial security and hope for a better future. The Telangana Government will handhold the beneficiaries for judiciously utilising the financial assistance. Hon’ble CM Sri K. Chandrashekar Rao formally launched the Dalit Bandhu scheme in Shalapally of the Huzurabad Assembly constituency in Karimnagar District on 16th August 2021.",
            url: 'https://dalitbandhu.telangana.gov.in/',
        },
        {
            id: 2,
            title: 'KCR Nutrition Kit',
            image: require('./assets/kcr_nutrition_kit.jpg'),
            matter:
                "Telangana Government launched yet another pioneering initiative ‘KCR Nutrition Kits’, which is aimed at reducing Anemia and improving hemoglobin levels in pregnant women. Each kit contains a kg of Nutritional Mix Powder, a kg of Dates (Khajoor), three bottles of Iron Syrup, 500 grams of Ghee and a Cup. The kits were distributed to pregnant women in nine districts of Telangana where prevalence of anemia was high. The programme was launched by Health Minister T. Harish Rao at Kamareddy on 21st December 2022.",
            url: 'https://www.myscheme.gov.in/schemes/kcr-nutrition-kit',
        },
        {
            id: 3,
            title: 'Mana ooru - Mana badi',
            image: require('./assets/mana_badi.jpg'),
            matter:
                "Mana ooru - Mana badi’ programme aimed at allround development and creation of effective infrastructure in schools across the State by setting up digital classrooms, constructing additional classrooms and taking up repairs to schools to benefit 19.84 lakh children of 26,065 schools in the state of Telangana. The programme launched on 8th March 2022.",
            url: 'https://manaoorumanabadi.telangana.gov.in/momb/',
        },
        {
            id: 4,
            title: 'Mission Kakatiya',
            image: require('./assets/kakatiya.jpg'),
            matter:
                "A flagship programme of the government aimed at restoring around 46,000 tanks in five years to provide irrigation source to about 25 lakh acres spending Rs 22,000 crore. As of  February,  2017, restoration work has been started for nearly 20,000 tanks and works have been completed for about 5,000 tanks.  Government  of Telangana has sanctioned more than Rs. 4,600 crore for this initiative in 2015-16 and 2016-17 budgets. As part of the Mission, activities like  desiltation , repairing damaged sluices and weirs, restoring dilapidated tank bunds, stone revetments and plugging seepages are carried out.",
            url: 'https://missionkakatiya.cgg.gov.in//',

        },
        {
            id: 5,
            title: 'Dharani',
            image: require('./assets/Dharani.jpg'),
            matter:
                "Government of Telangana intends to establish and manage a new Integrated Land Records Management System that combines Land administration and Registration services which serves as a single source of truth for all land parcels and discharge all land related functions in an integrated, efficient and effective manner with all actions on a near real time basis. Dharani also provides GIS system which provides visual representation of the land record data.",
            url: 'https://dharani.telangana.gov.in/homePage?lang=en',

        },
        {
            id: 6,
            title: 'Kanti Velugu',
            image: require('./assets/velugu.jpg'),
            matter:
                "The State Government has embarked on a Noble Project of achieving “avoidable blindness-free” status by conducting a Comprehensive and Universal Eye Screening for the entire population of the State under the title 'Kanti Velugu'. The Programme launched on 15th August, 2018.",
            url: 'https://drysrkv.ap.gov.in/',

        },
        {
            id: 7,
            title: 'Rythu Bandhu Scheme',
            image: require('./assets/rythub.jpg'),
            matter:
                "To enhance agriculture productivity and income to the farmers besides breaking the vicious cycle of rural indebtedness Agriculture Investment Support Scheme, popularly known as Rythu Bandhu is introduced from the year 2018-19 Kharif season to take care of initial investment needs of every farmer. Investment Support for Agriculture and Horticulture crops is being provided by way of grant of Rs. 5,000 per acre per season for purchase of inputs like Seeds, Fertilizers, Pesticides, Labour and other investments twice a year, for Rabi (Yasangi) and Kharif (Rainy) seasons. This is a first direct farmer investment support scheme in India, where the cash is paid directly.",
            url: 'https://rythubandhu.telangana.gov.in/',

        },
        {
            id: 8,
            title: 'Rythu Bima',
            image: require('./assets/bima.jpg'),
            matter:
                "The main objective of the Farmers Group Life Insurance Scheme (Rythu Bima), is to provide financial relief and social security to the family members/ dependents, in case of loss of farmer’s life due to any reason. In the event of the loss of the farmer life, their families are facing severe financial problems even for their day-to-day needs. The farmers Group Life Insurance Scheme ensures financial security and relief to the bereaved members of the farmer’s family. Farmers in the age group of 18 to 59 years are eligible for enroll under the scheme. In the event of the death of the enrolled farmer due to any cause including natural death, the insured amount of Rs. 5.00 Lakhs is deposited into the designated nominee account within (10) days.",
            url: 'https://rythubandhu.telangana.gov.in/Default_LIC1.aspx',

        },
        {
            id: 9,
            title: 'KCR Kit',
            image: require('./assets/kcr_kit.jpg'),
            matter:
                "The state government has launched KCR Kit Scheme for pregnant women. Pregnant women can utilize this scheme for maximum 2 deliveries. Women who give birth at a government hospital can utilize this scheme. The main aim of this scheme is to provide all the necessary items for pregnant women and the newborn baby. Under this scheme, pregnant women will be provided with financial assistance of Rs. 12,000 in three phases. In case of a baby girl, an additional Rs. 1000 will be given by the government. KCR Kit contains Baby oil, Soaps useful for mother and child, Mosquito net, Dresses, Handbag, Toys for child, Diapers, Powder, Shampoo, Sarees, Towel and Napkins, Baby bed.",
            url: 'https://hyderabad.telangana.gov.in/scheme/kcr-kit/',

        },
        {
            id: 10,
            title: 'T-Hub',
            image: require('./assets/t_hub.jpg'),
            matter:
                "The state government has launched KCR Kit Scheme for pregnant women. Pregnant women can utilize this scheme for maximum 2 deliveries. Women who give birth at a government hospital can utilize this scheme. The main aim of this scheme is to provide all the necessary items for pregnant women and the newborn baby. Under this scheme, pregnant women will be provided with financial assistance of Rs. 12,000 in three phases. In case of a baby girl, an additional Rs. 1000 will be given by the government. KCR Kit contains Baby oil, Soaps useful for mother and child, Mosquito net, Dresses, Handbag, Toys for child, Diapers, Powder, Shampoo, Sarees, Towel and Napkins, Baby bed.",
            url: 'https://t-hub.co/',

        },
        {
            id: 11,
            title: 'Mission Bhagiratha',
            image: require('./assets/mb.jpg'),
            matter:
                "Under the Telangana Drinking Water Supply Project, a mammoth 1.30 lakh km stretch of pipelines would be laid to quench the thirst of Telangana towns and villages apart from providing water for the industrial needs. For this project, surface water of perennial rivers and major reservoirs would be utilised as a raw water source.Taken up with an estimated cost of Rs 35,000 crore, Mission Bhagiratha is intended to ensure that no female member of a household would need to walk miles to carry a pot of water. Under  the this  flagship programme, it is conceived to provide 100 litres per capita per day (LPCD) treated and piped water to every household in rural areas, 135 LPCD in municipalities and 150 LPCD in municipal corporations. This pioneering scheme has been commended by the Government of India for other States to emulate.",
            url: 'https://missionbhagiratha.telangana.gov.in/',

        },
        {
            id: 12,
            title: 'Haritha Haram',
            image: require('./assets/hh.jpg'),
            matter:
                "Telangana Ku Haritha Haaram, a flagship programme of the Telangana Government envisages to increase the present 24% tree cover in the State to 33% of the total geographical area of the State. The thrust areas to achieve the above are two-fold; one, initiatives in notified forest areas, and the other, initiatives in areas outside the notified forest areas.",
            url: 'https://www.myscheme.gov.in/schemes/haritha-haram',

        },
        {
            id: 13,
            title: 'Kalyana Lakshmi',
            image: require('./assets/kl.jpg'),
            matter:
                "To alleviate financial distress of SC/ST and minority families, Government decided to sanction a one-time financial assistance of Rs. 1,00,116 at the time of marriage for brides who are residents of Telangana State. Accordingly, Kalyana Lakshmi and Shaadi  Mubaarak  Schemes have been introduced with effect from October 2,  2014  for unmarried girls, who have completed 18 years of age at the time of marriage and whose parental income does not exceed Rs. 2 lakh per annum.",
            url: 'https://telanganaepass.cgg.gov.in/KalyanaLakshmiLinks.jsp',

        },
        {
            id: 14,
            title: 'Arogya Lakshmi',
            image: require('./assets/al.jpg'),
            matter:
                "Telangana government provides one nutritious meal every day to pregnant and lactating women and children below the age of six through Anganwadi centres. The scheme was launched officially on January 1,  2015  by Honourable Chief Minister Sri K. Chandrashekar Rao.",
            url: 'https://hyderabad.telangana.gov.in/scheme/arogya-lakshmi/',

        },
        {
            id: 15,
            title: 'Asara Pensions',
            image: require('./assets/ap.jpg'),
            matter:
                "As a part of its welfare measures and social safety net strategy, the Telangana government has introduced the “ Aasara ” pensions, with a view to  ensure   secured  life with dignity for all the poor. Aasara pension scheme is meant to protect the most vulnerable sections of  society in particular  the old and infirm, people with HIV-AIDS, widows, incapacitated weavers and toddy tappers, who have lost their means of livelihood with growing age, in order to support their day to day minimum  needs required  to lead a life of dignity and social security The Telangana Government introduced “ Aasara ” - a new Pension scheme - enhancing the monthly pension from Rs. 200 to Rs. 1000 for the old aged, widows, weavers, toddy tappers and AIDS patients and Rs. 500 to Rs. 1500 for disabled persons From 2020-21 the government is providing Aasara pension of Rs. 2,016 to senior citizens, widows, beedi workers, filaria victims, single women, handloom weavers, toddy tappers and AIDS victims, and Rs. 3,016 for disabled pensions.",
            url: 'https://www.aasara.telangana.gov.in/SSPTG/UserInterface/Portal/GeneralSearch.aspx',

        },
        {
            id: 16,
            title: 'Housing for the Poor',
            image: require('./assets/hp.jpg'),
            matter:
                "This hallmark initiative of the Telangana government is intended to provide quality and respectable housing to the poor. The ‘housing for the poor’ plan provides for two and three storied buildings with the 2 BHK flats in Hyderabad and other urban areas while they are to be built as independent houses in rural areas. A pilot has been taken up at IDH Colony in Bhoidguda, Secunderabad. As many as 396 units - with each comprising of two bedrooms, hall and kitchen - are being constructed in 32 blocks of G+2 on 580 square yards at a cost of Rs 37 crore at 7.9 lakh per each flat.",
            url: 'https://hyderabad.telangana.gov.in/scheme/housing-for-the-poor/',

        },
        {
            id: 17,
            title: 'Land distribution to Daliths',
            image: require('./assets/ldd.jpg'),
            matter:
                "Another significant welfare scheme of the government that provides 3 acres of agricultural land to landless SC women, along with the provision for  creation  of irrigation facilities, land development and other agricultural inputs for their sustained livelihood.  Government  distributed 2,524 acres of land to 959 Dalits spending Rs 94 crore in the first year.",
            url: 'https://hyderabad.telangana.gov.in/scheme/land-distribution-to-dalits/#:~:text=Another%20significant%20welfare%20scheme%20of,inputs%20for%20their%20sustained%20livelihood.',

        },
        {
            id: 18,
            title: 'Rice Distribution',
            image: require('./assets/rd.jpg'),
            matter:
                "A whopping 87.57 lakh eligible families, approximately 2,86,00,000 (two crore  eighty six  lakh) beneficiaries, are being supplied rice from 1st  January,  2015 at 6 kgs per person at Re. 1 per kg without any ceiling on the number of members in the family. More than 1.80 lakh MT of rice per month would be required for this purpose. Rs. 1,597 was being spent on the subsidy. To arrive at the eligibility of the BPL families, the family income limit in rural areas has been increased to Rs. 1.50 lakh and in urban areas to Rs. 2 lakh. The land ceiling has also been increased to 3.5 acres of  wet land  and 7.5 acres of dry land.",
            url: 'https://hyderabad.telangana.gov.in/scheme/rice-distribution/',

        },
        {
            id: 19,
            title: 'She Teams',
            image: require('./assets/st.jpg'),
            matter:
                "Keeping rising incidents of crime against women in mind, the Telangana government has constituted a  seven member  committee headed by IAS officer Poonam Malakondaiah to advise it on the measures to be taken for the safety and security of women and girls. The committee submitted its report with 77 recommendations. Forming SHE teams is one of them. The teams keep  tab  on the eve-teasers and stalkers in crowded places. Initially set up in Hyderabad and Cyberabad police Commissionerates, they were expanded to all the Telangana districts on 1 April following the encouraging results.​​​",
            url: 'https://sheteamhydpolice.telangana.gov.in/index.html',

        },
        {
            id: 20,
            title: 'Sheep Distribution',
            image: require('./assets/sd.jpg'),
            matter:
                "This scheme gave a quantum jump to the rural economy and is designed for the upliftment of Yadava/Golla/Kuruma families who are approximately 4 lakhs in the state. Provision of financial support to these skilled families for rearing sheep on a large scale will facilitate not only their economic development but also facilitate production of sufficient meat in the state. It is also targeted to make Telangana a hub for meat export in near future. The traditional shepherd families will be supported with the supply of (20+1) sheep on 75% subsidy with a total project outlay of Rs. 5,000 crores.",
            url: 'https://cm.telangana.gov.in/2019/06/sheep-distribution/',

        },
        {
            id: 21,
            title: 'SoftNet',
            image: require('./assets/sn.jpg'),
            matter:
                "Society for Telangana Network is an initiative that provides quality education and training to identify groups who aim at achieving the last mile connectivity by utilizing the potential of Satellite Communications and Information Technology. SoFTNET uses GSAT 8 Satellite and telecasts four channels. T-SAT NIPUNA and T-SAT VIDYA cater to the distance learning, Agriculture Extension, Rural Development, Tele-Medicine and E-Governance requirements of the people of Telangana. SoFTNET has entered a fresh MoU with ISRO that came into effect from 28 September 2016. Apart from the launch of TS-Class programme, it also Started coaching classes for TSPSC Group II Services aspirants. SoFTNET has also promoted digital and cashless payments through awareness videos.",
            url: 'https://softnet.telangana.gov.in/',

        },
        {
            id: 22,
            title: 'Task',
            image: require('./assets/task.jpg'),
            matter:
                "A unique skill development initiative from IT, E&C Department aimed at improving the quality of graduates coming out of colleges by imparting industry-grade skill sets. More than 800 colleges have registered with TASK and over 1 lakh youth from across Telangana have been skilled since TASK’s inception in June 2015. TASK has also bagged the prestigious SKOCH Platinum award for Revamping Skilling Initiatives for youth in Telangana.",
            url: 'https://task.telangana.gov.in/',

        },
        {
            id: 23,
            title: 'T Fiber',
            image: require('./assets/tf.jpg'),
            matter:
                "T-Fiber aims at creating a scalable, robust, resilient, secure and long-lasting digital infrastructure to deliver various services, applications, content from Government and service providers. With a state-of-the-art network infrastructure, it is designed to achieve the goal of ‘Digital Telangana’. Affordable & reliable high-speed broadband connectivity is provided to every household, government and private institutions in Telangana. T-Fiber provides high-speed broadband connectivity to over 3.5 Cr. people and institutions in Telangana. T-Fiber will also form the basic platform for the provision of a number of services like e-governance, e-health, e-commerce, e-banking, video on demand, etc.",
            url: 'https://tfiber.telangana.gov.in/',

        },
        {
            id: 24,
            title: 'WE Hub- Woman Entrepreneurs Hub',
            image: require('./assets/wh.jpg'),
            matter:
                "WE Hub is a start-up incubator exclusively for women entrepreneurs. Through WE Hub aims to support women entrepreneurs with innovative ideas, solutions and entities focusing on emerging areas in technology. WE Hub will also support under-explored / unexplored sectors along with the Service sector. The mandate and goal of WE Hub is to eliminate financial, societal and support barriers for women and help them succeed in their enterprises.",
            url: 'https://wehub.telangana.gov.in/',

        },


    ];

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.conceptContainer}>

                {concepts.map((concept) => (
                    <TouchableOpacity
                        key={concept.id}
                        style={styles.conceptItem}
                        onPress={() => {
                            
                            Linking.openURL(concept.url).catch((error) => {
                                console.error('Error opening URL:', error);
                            });
                        }}
                    >
                        <View style={styles.imageContainer}>
                            <Image
                                source={concept.image}
                                style={[
                                    styles.conceptImage,
                                    concept.id === 0 ? styles.id0Image : null,
                                    concept.id === 11 ? styles.id11Image : null, 
                                ]}
                            />
                        </View>
                        <View style={styles.conceptMatterContainer}>
                            <Text style={styles.conceptTitle}>{concept.title}</Text>
                            <Text style={styles.conceptMatter}>{concept.matter}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FE0175', 
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 20,
    },
    iconButton: {
        paddingHorizontal: 10,
    },
    searchButton: {
        paddingHorizontal: 10,
    },
    logoutButton: {
        paddingHorizontal: 10,
    },
    profileImageContainer: {
        width: 30,
        height: 30,
        borderRadius: 15,
        marginRight: 10,
        top: -10,
        elevation: 5,
        shadowColor: 'black',
        shadowOffset: { width: 2, height: 4 },
        shadowOpacity: 0.2,
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 30,
    },
    videoContainer: {
        flex: 1,
        backgroundColor: 'white',
    },
    videoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    videoLabelContainer: {
        flex: 1,
    },
    videoLabel: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    thumbnail: {
        width: 80,
        height: 60,
        marginLeft: 10,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between', 
        alignItems: 'center', 
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: '#FFFFFF', 
        
        elevation: 10, 
        shadowColor: 'black', 
        shadowOffset: { width: 4, height: 6 }, 
        shadowOpacity: 0.2, 
    },

    footerButton: {
        alignItems: 'center',
        color: '#FE0175',
    },
    iconLabel: {
        alignItems: 'center',
        color: '#FE0175',
    },
    activeIconLabel: {
        color: '#c0c0c0', 
    },
    conceptContainer: {
        flex: 1,
        backgroundColor: 'white',
    },
    conceptItem: {
        flexDirection: 'column',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#FE0175',
    },
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    conceptImage: {
        resizeMode: 'cover',
        marginBottom: 10,
    },

    id0Image: {
        width: "100%",
        height: 180,
    },
    id11Image: {
        width: "100%",
        height: 140,
    },
    conceptMatterContainer: {
        flex: 1,
    },
    conceptTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        color: "#FE0175"
    },
    conceptMatter: {
        fontSize: 16,
    },
    activeIconLabel: {
        color: '#c0c0c0',
    },
    activeFooterButton: {
        color: '#c0c0c0',
    },
    mapButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    },
    mapButton: {
        backgroundColor: '#FE0175',
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: "10%",
        borderWidth: 0.9,
        borderColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15,
        shadowColor: 'black',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.5,
        elevation: 2,
    },
    naduNeduButtonContainer: {
        flex: 1,
        width: "100%",
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5, 
        marginBottom: 5, 
    },
    imageContainer: {
        alignItems: 'center',
        marginBottom: 10,
    },
    image: {
        width: 300,
        height: 300,
        resizeMode: 'contain',
    },
});

export default Weblinks;