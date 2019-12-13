exports.DeleteTicket = (ticketNum, deleteSuccess = () => { console.log('delete success') }, deleteError = () => {console.log("delete error")}) => {
    let deleteConfirm = window.confirm("Want to Delete This Ticket?");
    if (deleteConfirm)
        fetch("/api/posts/ticketNumber/" + ticketNum, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(res => {
                if (res.ok) {
                    deleteSuccess();
                    return res.json();
                }

                throw new Error('Content validation');
            })
            .catch(err => {
                deleteError();
            });
};
