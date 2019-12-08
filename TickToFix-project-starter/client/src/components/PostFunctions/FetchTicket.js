import { isUuid } from 'uuidv4';

exports.searchByTicketNumber = (ticketNum, callBackFunc) => {
    if (ticketNum && isUuid(ticketNum))
        fetch("/api/posts/ticketNumber/" + ticketNum)
            .then(res => res.json())
            .then(posts => {
                callBackFunc(posts);
                // console.log(posts.id);
                // this.setState({
                //     loading: false,
                //     id: posts.id,
                //     // posts: <div><Post {...posts} key={posts.id} /> <button onClick={() => this.deleteSearchedPost(posts.id) }>delete</button></div>,
                //     posts: <SelectedPost {...posts} key={posts.id} deleteTicket={DeleteTicket} deleteSuccess={this.deleteSuccess} deleteError={this.deleteErr} />
                // });
            })
            .catch(err => console.log("API ERROR: ", err));
    ;}

exports.getTickets = (callBackFunc) => {
    fetch("/api/posts")
        .then(res => res.json())
        .then(posts => {
            posts.map((element, ii) => {
                console.log({ ...element });
                console.log(ii);
            });
            callBackFunc();
            // this.setState({
            //   loading: false,
            //   posts: posts.map((p, ii) => <Post {...p} key={ii} />),
            // });

        })
        .catch(err => console.log("API ERROR: ", err));
};