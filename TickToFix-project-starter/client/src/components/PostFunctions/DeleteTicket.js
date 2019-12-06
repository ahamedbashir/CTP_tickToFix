exports.DeleteTicket = (ticketNum, deleteSuccess, deleteError) => {
    let deleteConfirm = window.confirm("Want to Delete This Ticket?");
    if (deleteConfirm)
        fetch("/api/posts/ticket/" + ticketNum, {
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
