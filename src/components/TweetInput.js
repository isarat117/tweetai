import axios from 'axios';
import { useState } from 'react';
import properties from '../utils';
import './TweetInput.css';  // CSS dosyasını import ediyoruz

const TweetInput = () => {
  const [formData, setFormData] = useState({
    tweet_owner: '',
    tweet: '',
  });
  const [estimate, setEstimate] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true); // Yükleme süresi başlatılır
    setEstimate('')
    try {
      console.log(formData);
      const response = await axios.post(`${properties.domainName}/get-tweet-estimate`, formData);
      setEstimate(response.data.estimate);
    } catch (error) {
      console.error('There was an error!', error);
    } finally {
      setIsLoading(false); // Yükleme süresi sona erdirilir
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="tweet-form">
        <input
          type="text"
          name="tweet_owner"
          value={formData.tweet_owner}
          onChange={handleChange}
          placeholder="Coin Adı"
          className="tweet-input"
        />
        <textarea
          name="tweet"
          value={formData.tweet}
          onChange={handleChange}
          placeholder="Tweet İçeriği"
          className="tweet-textarea"
        />
        <button type="submit" className="tweet-button" disabled={isLoading}>
          {isLoading ? 'Yükleniyor...' : 'Submit'}
        </button>
      </form>
      <div className='estimate-box'>
        {isLoading && <div className="loading-spinner"></div>}
        {estimate !== '' && (
            <div>
            <h1>Sonuç: {estimate}</h1>
            </div>
        )}
      </div>
     
    </div>
  );
};

export default TweetInput;
