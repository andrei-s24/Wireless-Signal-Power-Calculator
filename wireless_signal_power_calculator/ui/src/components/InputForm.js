import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { AntennaInput } from './AntennaInput';

export function InputForm(props) {
    return (
        <Form onSubmit={e => {
            e.preventDefault();
            let data = new FormData(e.target);
            let dataEntries = data.entries();
            let URL = "calc_api/calc?";
            for (const pair of dataEntries) {
                let key = pair[0]
                let value = pair[1]
                URL += key + "=" + value + "&";
            }
            const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
            fetch(URL, {
                method: 'GET',
                headers: { "X-CSRFToken": csrftoken }
            }).then(response => response.json())
                .then(data => {
                    props.setData(data["array"]);
                })
                .catch((error) => {
                    console.error('Error:', error)
                });
        }}>
            {/* CSRF Token not working */}
            <h1> Inputs </h1>
            <AntennaInput name="transmitter" />
            <AntennaInput name="receiver" />
            <AntennaInput name="interferer" />
            <Button type="submit" className="custom-btn">Submit</Button>
        </Form>
    )
}
