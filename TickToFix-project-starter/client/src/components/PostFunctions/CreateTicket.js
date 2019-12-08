exports.createTicket = (event) => {
    fetch("/api/posts/", {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title: this.state.title, content: this.state.content, userName: this.state.userName, contactNum: this.state.contactNum, apt: this.state.apt })
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        }

        throw new Error('Content validation');
      })
      .then(post => {
        this.setState({
          success: true,
          ticketNum: post.ticketNum,
          id: post.id,
          post: post
        });
        console.log(post.ticketNum);
      })
      .catch(err => {
        this.setState({
          error: true,
        });
      });
  }