import { useState } from 'react';
import useShowNotificationMessage from './useShowNotificationMessage';
import { useSnackbarMessage } from './useSnackbarMessage';

const useDeleteItem = (deleteFunction, mutate, itemType = 'item') => {
    const [openConfirmMessage, setOpenConfirmMessage] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
    const { showNotificationMessage } = useSnackbarMessage(); // multiple notification
    const openDeleteConfirmation = (itemId) => {
        setOpenConfirmMessage(true);
        setItemToDelete(itemId);
    };

    // delete item hooks
    const handleDeleteItem = (itemId) => {
        console.log('itemId id: ', itemId);
        // 1.  open confirm message
        setOpenConfirmMessage(true);
        // 2. store the product information data
        setItemToDelete({ itemId: itemId });
    };

    console.log('product to remove information: ', itemToDelete);
    // disagree, not delete the products
    const handleConfirmDisagree = () => {
        setOpenConfirmMessage(false);
        setItemToDelete(null);
    };

    const handleConfirmAgree = async () => {
        console.log('chay vo day');
        if (itemToDelete) {
            const id = itemToDelete.itemId;
            try {
                // filter products and update rows
                const deleteResponse = await deleteFunction(id);
                console.log('deleteResponse: ', deleteResponse);
                mutate();

                if (deleteResponse.status === 200) {
                    showNotificationMessage(
                        'success',
                        `Delete ${itemType}`,
                        `Xóa ${itemType} thành công`,
                    );
                    // // re-update to list
                    // const updatedbrands = brands.filter((brand) => brand._id !== id);
                    // setBrands(updatedbrands);
                    setOpenConfirmMessage(false);
                    setItemToDelete(null);
                }

                console.log('deleteResponse: ', deleteResponse);
            } catch (error) {
                showNotificationMessage('error', `Delete ${itemType}`, `Xóa ${itemType} thất bại`);
                console.error('Error deleting product:', error);
            }
        }
    };
    return {
        openConfirmMessage,
        openDeleteConfirmation,
        handleConfirmDisagree,
        handleConfirmAgree,
        handleDeleteItem,
    };
};

export default useDeleteItem;
