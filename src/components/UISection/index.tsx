import ComboBox from '../ComboBox';
import Slider from '../Slider';

function ParameterGroup(props) {
    return (<div className="parameter-group">
        <h3>{props.name}</h3>
        {props.parameters.map(parameter => {
            if (parameter.uiType === "Slider") return (
                <Slider
                    key={`filter${parameter.name}`}
                    paramName={parameter.name}
                    statusByte={props.statusByte}
                    controlNumber={parameter.controlNumber}
                    convert={parameter.convert}
                />
            )
            if (parameter.uiType === "ComboBox") return (
                <ComboBox
                    key={`filter${parameter.name}`}
                    controlNumber={parameter.controlNumber}
                    paramName={parameter.name}
                    statusByte={props.statusByte}
                    options={["lowpass", "bandpass", "highpass"]}
                />
            )
        }
        )}
    </div>)
}

export default ParameterGroup;