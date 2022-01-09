import { useState, useEffect } from 'react';
import { Grid, Button, TextField } from '@material-ui/core/';

const Contatos = () => {

    const url = 'http://localhost:5000/message'
    const [message, setMessage] = useState([]);
    const [author, setAuthor] = useState('');
    const [content, setContent] = useState('');
    const [validatorEmail, setValidatorEmail] = useState(false);
    const [validator, setValidator] = useState(false);
    const [render, setRender] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(async () => {
        const response = await fetch(url)
        const data = await response.json();
        setMessage(data);
        console.log("Entrou NO USEEFFECT!!!");
        return () => {
            setValidator(false);
            setValidatorEmail(false);
            console.log("Desmontando useEffect!!!");
        }
    }, [render])

    const sendMessage = () => {
        setValidator(false);
        setValidatorEmail(false);
        const validateEmail = (email) =>{
            return email.match(
                /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
        };
        
        if (!validateEmail(author) && author.length !== 0){
            let email = document.getElementById('name');
            email.style.color = 'red';
            email.style.border = '1px solid red';
            email.style.paddingLeft = '10px';
            email.style.boxShadow = '0px 0px 3px red';
            // alert('Email com estrutura incorreta');            
            console.log("1");            
            setValidatorEmail(true);
            setTimeout(() => {
                setAuthor('');
                email.style.color = 'black';
                email.style.border = '0px solid red';
                email.style.paddingLeft = '0px';
                email.style.boxShadow = '0px 0px 0px red';
                setValidatorEmail(false);
            }, 5000)
        } else if(author.length <= 0 || content.length <= 0){
            //return setValidator(!validator)
            //alert('Preencha todos os dados!!!');
            //setValidator(true);
            console.log("2");
            setValidator(true);
            setTimeout(() => {
                setValidator(false);
            }, 5000);
        } else {
            const bodyForm = {
                email: author,
                message: content,
            }
            console.log("3");
            fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(bodyForm)
            })
            .then((response) => response.json())
            .then((data) => {
                console.log("4");
                if(data.id) {
                    setRender(true);
                    setSuccess(true);
                    setTimeout(() => {
                        setSuccess(false);
                    }, 5000)
                }
            })
            console.log("5");
            setAuthor('');
            setContent('');
            
            console.log("6 " + content);
        }
    }  

    return(
        <div className="container-fluid row px-2 py-2 m-0 justify-content-between" style={{backgroundColor: 'rgba(130,80,255,0.15)'}}>
            <Grid className="p-0" >
                <TextField id="name" label="Email" value={author} onChange={(event)=>{setAuthor(event.target.value)}} fullWidth/>
                <TextField id="message" label="Message" value={content} onChange={(event)=>{setContent(event.target.value)}} fullWidth/>
            </Grid>

            {validator && 
                <div className="alert alert-danger alert-dismissible fade show mt-2" role="alert">
                    <strong>Por favor preencha todos os campos!</strong>
                    {/* <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> */}
                </div>
            }
            {validatorEmail && 
                <div className="alert alert-danger alert-dismissible fade show mt-2" role="alert">
                    <strong>Digite seu e-mail corretamente!</strong>
                    {/* <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> */}
                </div>
            }

            {success && 
                <div className="alert alert-success alert-dismissible fade show mt-2" role="alert">
                    <strong>Mensagem foi enviada!</strong>
                </div>
            }

            <Button onClick={sendMessage} className="mt-2" variant="contained" color="primary">
                Sent
            </Button>

            {message.map((content) => {
                return(
                    <div className="card mt-2 col-md-6 " key={content.id}>
                        <div className="card-body">
                            <h5 className="card-title">{content.email}</h5>
                            <p className="card-text">{content.message}</p>
                            <p className="card-text"><small className="text-muted">{content.created_at}</small></p>
                        </div>
                    </div>
                )
            } )}
        </div>
    )
}

export default Contatos;
