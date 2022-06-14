import React, {
    useState,
    useEffect
} from "react";
import { Alert } from "react-native";
// Components
import { UserList } from "@froyo/lists";
// Context
import { useUser } from "@froyo/user-context";
// Navigation
import { NavigationEvents } from "react-navigation";

const SearchUserScreen = (props) => {
    // Context
    const { searchUser } = useUser();

    // Props
    const {
        navigation
    } = props;

    // State
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    // Navigation params
    const query = navigation.getParam("searchQuery");

    const retreiveUsers = async () => {
        try {
            setLoading(true);
            setResults(
                !query
                    ? []
                    : await searchUser({ text: query })
            );
        }
        catch(err) {
            Alert.alert(err.response.data);
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        retreiveUsers();
    }, [query]);

    return (
        <>
            <NavigationEvents
                onDidFocus={retreiveUsers}
            />
            <UserList
                users={results}
                loading={loading}
            />
        </>
    );
};

export default SearchUserScreen;