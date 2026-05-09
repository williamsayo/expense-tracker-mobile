import { getProfile, updateProfile } from "@/lib/network/expensio";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useProfile = () =>
    useQuery({
        queryKey: ["profile"],
        queryFn: getProfile,
    });

export const useUpdateProfile = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["updateProfile"],
        mutationFn: (data: any) => updateProfile(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["profile"] });
        },
    });
};
