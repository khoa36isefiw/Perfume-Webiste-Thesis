import axiosClient from './axiosClient';

export const categoriesAPI = {
    getAllCategory: () => {
        const url = '/categories/';
        return axiosClient.get(url);
    },
    getAllParentCategory: () => {
        const url = '/categories/parent';
        return axiosClient.get(url);
    },
    createCategory: (data) => {
        const url = '/categories/';
        return axiosClient.post(url, data);
    },
    getChildCategoryByPId: (id) => {
        const url = `/categories/${id}/child`;
        return axiosClient.get(url);
    },
};

//     getAllParentCategory: async () => {
//         try {
//             const respone = await axios.get(apiUrl + '/parent');
//             return respone.data;
//         } catch (error) {
//             console.error(error);
//         }
//     },
//     getChildCategoryByPId: async (id) => {
//         try {
//             const respone = await axios.get(apiUrl + `/${id}/child`);
//             return respone.data;
//         } catch (error) {
//             console.error(error);
//         }
//     },
//     // getCategoryByChildId: async (id) => {
//     //     try {
//     //         const respone = await axios.get(apiUrl + `/${id}/parent`);
//     //         return respone.data;
//     //     } catch (error) {
//     //         console.error(error);
//     //     }
//     // },
//     getCategoryById: async (id) => {
//         try {
//             const respone = await axios.get(apiUrl + `/${id}`);
//             return respone.data;
//         } catch (error) {
//             console.error(error);
//         }
//     },
//     createCategory: async (data) => {
//         try {
//             const respone = await axios.post(apiUrl + '/', data);
//             return respone;
//         } catch (error) {
//             console.log(error);
//         }
//     },
//     updateCategory: async (id, data) => {
//         try {
//             const respone = await axios.put(apiUrl + `/${id}`, data);
//             return respone;
//         } catch (error) {
//             console.log(error);
//         }
//     },
//     deleteCategory: async (id) => {
//         try {
//             const respone = await axios.delete(apiUrl + `/${id}`);
//             return respone;
//         } catch (error) {
//             console.log(error);
//         }
//     },
// };

// export default categoryService;
