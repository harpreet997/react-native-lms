import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

    /*   styles started for Dashboard screen */

    homeContainer: {
        flex: 1,
        backgroundColor: "coral",
    },

    main: {
        alignItems: "center",
    },
    startScreentext: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 10,
        color: "black"
    },
    loginOption: {
        backgroundColor: 'lightgreen',
        borderRadius: 100,
        width: 200,
        alignItems: "center",
        paddingVertical: 10,
    },
    signupOption: {
        backgroundColor: 'lightgreen',
        borderRadius: 100,
        width: 200,
        alignItems: "center",
        paddingVertical: 10,
        marginVertical: 20
    },
    logintext: {
        fontSize: 18,
        color: "black"
    },
    signuptext: {
        fontSize: 18,
        color: "black"
    },
    image: {
        marginVertical: 10,
        width: 300,
        height: 300,
        borderRadius: 150,
    },

    /*   styles ended for Dashboard screen */

    /*   styles started for login screen */
    container: {
        flex: 1,
        backgroundColor: 'lightgreen',
        paddingTop: 20,
    },
    loginMain: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "black",
        marginHorizontal: 10,
        padding: 5
    },
    text: {
        marginLeft: 10,
        marginBottom: 10,
        fontSize: 17,
        fontWeight: 'bold',
        textAlign: 'left',
        color: "black"
    },
    textbox: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'black',
        paddingLeft: 10,
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,
        color: "black"
    },
    login: {
        backgroundColor: 'dodgerblue',
        borderRadius: 100,
        width: 200,
        alignItems: "center",
        paddingVertical: 10,
        marginLeft: "auto",
        marginRight: "auto"
    },

    /*   styles ended for login screen */

    /*   styles started for register screen */
    signupMain: {
        justifyContent: 'center',
        paddingBottom: 30,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "black",
        marginHorizontal: 10,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 5,
        paddingRight: 5,
        marginBottom: 25
    },
    register: {
        backgroundColor: 'dodgerblue',
        borderRadius: 100,
        width: 200,
        alignItems: "center",
        paddingVertical: 10,
        marginLeft: "auto",
        marginRight: "auto",
    },

    /*   styles ended for register screen */

    /*   styles started for profile screen */
    profileContainer: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "lightgreen"
    },
    profileImage: {
        marginVertical: 10,
        width: 300,
        height: 300
    },
    logout: {
        backgroundColor: 'dodgerblue',
        borderRadius: 100,
        width: 200,
        alignItems: "center",
        paddingVertical: 10,
        marginHorizontal: "15%"
    },
    logouttext: {
        fontSize: 18,
        fontWeight: "bold"
    },

    /*   styles ended for profile screen */

    /*   styles started for Apply Leave screen */
    applyLeaveContainer: {
        flex: 1,
        backgroundColor: 'lightgreen',
        paddingTop: 20,

    },
    applyLeaveMain: {
        justifyContent: 'center',
        paddingBottom: 30
    },

    applyLeave: {
        backgroundColor: 'dodgerblue',
        borderRadius: 100,
        width: 200,
        alignItems: "center",
        paddingVertical: 10,
        marginHorizontal: "20%"
    },
    applyLeaveText: {
        fontSize: 18,
        fontWeight: "bold"
    },
    datapicker: {
        backgroundColor: "lightgreen",
    },
    selectLeave: {
        color: "black"
    },

    /*   styles ended for Apply Leave screen */

    /*   styles started for All Leaves, Pending Leaves, and Rejected Leaves, Project List screen */
    LeaveListItems: {
        flexDirection: 'row', 
        borderWidth: 1, 
        borderRadius: 5, 
        borderColor: 'black', 
        margin: 3
    }, 

    textSize: {
        fontSize: 18,
        marginLeft: 5,
        marginRight: 5,
        fontWeight: 'bold',
        color: "black"
    },
    listheadingContainer: {
        flexDirection: 'row', 
        borderWidth: 1, 
        borderRadius: 5, 
        borderColor: 'black', 
        margin: 3
    }, 

    listheading: {
        width: 100,
        justifyContent: "center"

    },
    listheadingAction: {
        width: 120,
        justifyContent: "center"
    },
    listbody: {
        fontSize: 15,
        marginLeft: 5,
        marginRight: 5,
        color: 'black'
    },
    verticalline: {
        justifyContent: "center"
    },
    textCaptital: {
        textTransform: 'capitalize',
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    edit: {
        backgroundColor: 'dodgerblue',
        borderRadius: 5,
        width: 70,
        alignItems: "center",
        paddingVertical: 10,
        margin: 5
    },
    edittext: {
        fontSize: 15,
        fontWeight: "bold"
    },
    delete: {
        backgroundColor: 'green',
        borderRadius: 5,
        width: 70,
        alignItems: "center",
        paddingVertical: 10,
        margin: 5
    },
    deletetext: {
        fontSize: 15,
        fontWeight: "bold"
    },
    indicator: {
        alignItems: "center",
        marginHorizontal: 150
    },
    indicatorWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    indicatorText: {
        fontSize: 18,
    },
    /*   styles ended for All Leaves, Pending Leaves, and Rejected Leaves screen */

    /*   styles started for Employees List screen */

    employeesListItems: {
        flexDirection: 'row', 
        borderWidth: 1, 
        borderRadius: 5, 
        borderColor: 'black', 
        margin: 3
    }, 

    primaryBackground: {
        backgroundColor: "#D6EEEE"
    },

    secondaryBackground: {
        backgroundColor: "lightgrey"
    },

    employeesListHeading: {
        width: "35%",
        justifyContent: "center"

    },
    employeesListHeadingAction: {
        width: "30%",
        justifyContent: "center"
    },

    /*   styles ended for Employees List screen */


    /*   styles started for Add Employee screen */
    modalView: {
        margin: 15,
        backgroundColor: 'lightgrey',
        borderRadius: 20,
        padding: 35,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    addEmployeeText: {
        marginBottom: 10,
        fontSize: 17,
        fontWeight: 'bold',
        color: "black"
    },
    modalHeading: {
        marginBottom: 10,
        fontSize: 22,
        fontWeight: 'bold',
        color: "black"
    },
    addEmployeeTextbox: {
        borderWidth: 1,
        borderColor: 'black',
        paddingLeft: 10,
        marginBottom: 10,
        marginRight: 10,
        color: "black"
    },
   

    /*   styles ended for Add Employee screen */

    /*   styles started for Edit Employee screen */
    editEmployeeText: {
        marginBottom: 10,
        fontSize: 17,
        fontWeight: 'bold',
        color: "black"
    },

    editEmployeeTextbox: {
        borderWidth: 1,
        borderColor: 'black',
        paddingLeft: 10,
        marginBottom: 10,
        marginRight: 10,
        color: "black"
    },

    selectProject: {
        color: "black"
    },

    /*   styles ended for Edit Employee screen */

    /*   styles started for Project List screen */

    projectlistItems: {
        flexDirection: 'row', 
        borderWidth: 1, 
        borderRadius: 5, 
        borderColor: 'black', 
        margin: 3
    },

    projectlistheading: {
        width: "20%",
        justifyContent: "center"

    },
    projectlistheadingAction: {
        width: 130,
        justifyContent: "center"
    },

    projectedit: {
        backgroundColor: 'dodgerblue',
        borderRadius: 5,
        width: 55,
        alignItems: "center",
        paddingVertical: 10,
        margin: 5
    },

    projectdelete: {
        backgroundColor: 'green',
        borderRadius: 5,
        width: 55,
        alignItems: "center",
        paddingVertical: 10,
        margin: 5
    },

    /*   styles ended for Employees List screen */

    /*   styles started for Edit Project screen */
    editprojecttext: {
        marginBottom: 10,
        fontSize: 17,
        fontWeight: 'bold',
        color: "black"
    },

    editprojecttextbox: {
        borderWidth: 1,
        borderColor: 'black',
        paddingLeft: 10,
        marginBottom: 10,
        marginRight: 10,
        color: "black"
    },

    /*   styles ended for Edit Project screen */

    /*   styles started for Add Project screen */

    addprojecttext: {
        marginBottom: 10,
        fontSize: 17,
        fontWeight: 'bold',
        color: "black"
    },

    addprojecttextbox: {
        borderWidth: 1,
        borderColor: 'black',
        paddingLeft: 10,
        marginBottom: 10,
        marginRight: 10,
        color: "black"
    },

    /*   styles ended for Add Project screen */
})

export default styles