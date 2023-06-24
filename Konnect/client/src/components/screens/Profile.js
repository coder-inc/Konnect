import React from 'react' ;

const Profile = () =>{
    return (
        <div style={{maxWidth:"550px", margin:"0px auto"}}>
            <div style={{
                display:'flex',
                justifyContent:'space-around',
                margin:"18px 0px",
                borderBottom:"1px solid grey"
            }}>
                <div>
                    <img style={{width:"160px", height:"160px",borderRadius:"80px"}}                 
                    src="https://media.istockphoto.com/id/1430286042/photo/focus-businessman-designer-and-computer-planning-typing-and-strategy-for-working-in-modern.webp?b=1&s=170667a&w=0&k=20&c=tyncL3Dd_2xFbUfrdvG5cvhWx-8ATolXx4zs-Bh44J4=" alt="#" />
                </div>
                <div>
                    <h4>Abhishek Singh Sankhla</h4>
                    <div style={{display:'flex', justifyContent:'space-between', width:'108%'}}>
                        <h6>40 Posts</h6>
                        <h6>40 Followers</h6>
                        <h6>40 Following</h6>
                    </div>
                </div>
            </div>
            <div className='gallery' style={{}}>
                <img className='item' src="https://media.istockphoto.com/id/1430286042/photo/focus-businessman-designer-and-computer-planning-typing-and-strategy-for-working-in-modern.webp?b=1&s=170667a&w=0&k=20&c=tyncL3Dd_2xFbUfrdvG5cvhWx-8ATolXx4zs-Bh44J4=" alt="#" />
                <img className='item' src="https://media.istockphoto.com/id/1430286042/photo/focus-businessman-designer-and-computer-planning-typing-and-strategy-for-working-in-modern.webp?b=1&s=170667a&w=0&k=20&c=tyncL3Dd_2xFbUfrdvG5cvhWx-8ATolXx4zs-Bh44J4=" alt="#" />
                <img className='item' src="https://media.istockphoto.com/id/1430286042/photo/focus-businessman-designer-and-computer-planning-typing-and-strategy-for-working-in-modern.webp?b=1&s=170667a&w=0&k=20&c=tyncL3Dd_2xFbUfrdvG5cvhWx-8ATolXx4zs-Bh44J4=" alt="#" />
                <img className='item' src="https://media.istockphoto.com/id/1430286042/photo/focus-businessman-designer-and-computer-planning-typing-and-strategy-for-working-in-modern.webp?b=1&s=170667a&w=0&k=20&c=tyncL3Dd_2xFbUfrdvG5cvhWx-8ATolXx4zs-Bh44J4=" alt="#" />
                <img className='item' src="https://media.istockphoto.com/id/1430286042/photo/focus-businessman-designer-and-computer-planning-typing-and-strategy-for-working-in-modern.webp?b=1&s=170667a&w=0&k=20&c=tyncL3Dd_2xFbUfrdvG5cvhWx-8ATolXx4zs-Bh44J4=" alt="#" />
                <img className='item' src="https://media.istockphoto.com/id/1430286042/photo/focus-businessman-designer-and-computer-planning-typing-and-strategy-for-working-in-modern.webp?b=1&s=170667a&w=0&k=20&c=tyncL3Dd_2xFbUfrdvG5cvhWx-8ATolXx4zs-Bh44J4=" alt="#" />
            </div>
        </div>
    )
}

export default Profile ;