import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from 'axios';
import toast from "react-hot-toast";

const useFollow = () => {
    const queryClient = useQueryClient();
    const { mutate: follow, isPending } = useMutation({
        mutationFn: async (userId) => {
            try {
                const { data } = await axios.post(`/api/users/follow/${userId}`)
                console.log("follow btn clicked");
                return data;
            } catch (error) {
                console.log("useFollowError", error)
            }
        },
        onSuccess: () => {
            Promise.all([
                queryClient.invalidateQueries({ queryKey: ["suggestedUsers"] }),
                queryClient.invalidateQueries({ queryKey: ["authUser"] })
            ])
        },
        onError: (error) => {
            console.log("useFollowError", error);
        }
    })

    return { follow, isPending };
}

export default useFollow;