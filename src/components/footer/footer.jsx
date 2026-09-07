import { useEffect, useState } from "react";
import styled from "styled-components";

// eslint-disable-next-line react-refresh/only-export-components
const FooterContainer = ({ className }) => {
    const [city, setCity] = useState("");
    const [temperature, setTemperature] = useState("");
    const [weather, setWeather] = useState("");
    useEffect(() => {
        fetch(
            "https://api.openweathermap.org/data/4.0/onecall/weather?lat=59.9387&lon=30.3149&units=metric&lang=ru&appid=b398cf8669661b91a4f8ad51f31d668f",
        )
            .then((res) => res.json())
            .then(({ timezone, data, weather }) => {
                (setCity(timezone),
                    setTemperature(Math.round(data.temp)),
                    setWeather(weather[0].description));
            });
    }, []);
    return (
        <div className={className}>
            <div>
                <div>Блог веб-разработчика</div>
                <div>web@developer.ru</div>
            </div>
            <div>
                <div>
                    {city},{" "}
                    {new Date().toLocaleString("ru", {
                        day: "numeric",
                        month: "long",
                    })}
                </div>
                <div>
                    {temperature} градусов, {weather}
                </div>
            </div>
        </div>
    );
};

export const Footer = styled(FooterContainer)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 120px;
    width: 1000px;
    padding: 20px 40px;
    font-weight: bold;
    background-color: #fff;
    box-shadow: 0 2px 17px #000;
`;
