import React, {useState, useEffect} from 'react';

import './style.css';

export default function DevForm({onSubmit}) {
  const [loading, setLoading] = useState(false);
  const [github_username, setUsernameGithub] = useState('');
  const [techs, setTechs] = useState('');

  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const {latitude, longitude} = position.coords;
        setLatitude(latitude);
        setLongitude(longitude);
      },
      (err) => {
        console.log(err);
      },
      {
        timeout: 30000
      }

    )
  }, [])

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      await onSubmit({
        github_username,
        techs,
        latitude,
        longitude
      });

      setUsernameGithub('');
      setTechs('');
    } catch (error) {
      alert("Error ao buscar dev!")
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-block">
        <label htmlFor="username_github">Usuário do Github</label>
        <input
          name="username_github"
          id="username_github"
          required
          value={github_username}
          onChange={e => setUsernameGithub(e.target.value)}
        />
      </div>

      <div className="input-block">
        <label htmlFor="techs">Tecnologias</label>
        <input
          name="techs"
          id="techs"
          required
          value={techs}
          onChange={e => setTechs(e.target.value)}
        />
      </div>

      <div className="input-group">
        <div className="input-block">
          <label htmlFor="latitude">Latitude</label>
          <input
            type="number"
            name="latitude"
            id="latitude"
            required
            value={latitude}
            onChange={e => setLatitude(e.target.value)}
          />
        </div>
        <div className="input-block">
          <label htmlFor="longitude">Longitude</label>
          <input
            type="number"
            name="longitude"
            id="longitude"
            required
            value={longitude}
            onChange={e => setLongitude(e.target.value)}
          />
        </div>
      </div>
      <button type="submit" disabled={loading}> {loading ? 'Carrengando' : 'Salvar' }</button>
    </form>
  );
}
