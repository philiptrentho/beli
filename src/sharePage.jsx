import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Card, ConfigProvider } from 'antd';
import { useLocation } from 'react-router-dom';
import { TinyColor } from '@ctrl/tinycolor';
import IosShareIcon from '@mui/icons-material/IosShare';


const { Meta } = Card;

const SharePage = () => {
    const location = useLocation();
    const rawResponses = location.state?.responses || [];
    const nameWidthRef = useRef(null);
    const [maxWidth, setMaxWidth] = useState(300);  // Adjusting this to manage dynamic width more effectively

    const emojiDetails = [
        { emoji: '🍎', color: '#d1e0e0' }, // apple - soft blue
        { emoji: '🍔', color: '#f4e4ba' }, // burger - light beige
        { emoji: '🍕', color: '#fbe5d6' }, // pizza - pale orange
        { emoji: '🍣', color: '#e0f2f1' }, // sushi - pale teal
        { emoji: '🍰', color: '#fce4ec' }, // cake - pink lace
        { emoji: '🍜', color: '#fff3e0' }, // noodles - light gold
        { emoji: '🌮', color: '#e1f5fe' }, // taco - light cyan
        { emoji: '🍟', color: '#ffecb3' }  // fries - soft yellow
    ];
    const getRandomItem = (items) => items[Math.floor(Math.random() * items.length)];
    const selectedEmoji = useMemo(() => getRandomItem(emojiDetails), []);

    useEffect(() => {
        const namesContainer = nameWidthRef.current;
        if (namesContainer) {
            const maxNameWidth = Math.max(...Array.from(namesContainer.querySelectorAll('.name-item')).map(name => name.offsetWidth));
            setMaxWidth(Math.max(350, maxNameWidth + 40));  // Increase base width to accommodate more content in one line
        }
    }, [rawResponses]);

    const data = rawResponses.reduce((filtered, response) => {
        const analysisData = {};
        response.analysis.split('\n').forEach(line => {
            const [key, value] = line.split(':');
            if (key && value) {
                analysisData[key.trim().toLowerCase().replace(' ', '')] = value.trim();
            }
        });

        if (analysisData['restaurantname'] && analysisData['restaurantname'].trim() !== 'NA') {
            filtered.push({
                key: response.id,
                name: analysisData['restaurantname'],
                rating: analysisData['rating'] || 'NA',
                location: analysisData['city'] || 'NA',
            });
        }
        return filtered;
    }, []);

    const handleShare = () => {
        const textData = data
            .map((item) => `${item.name}\nRating: ${item.rating}\nLocation: ${item.location}\n`)
            .join('\n');
        navigator.clipboard.writeText(textData)
            .then(() => alert('Information copied to clipboard!'))
            .catch((error) => {
                console.error('Failed to copy data:', error);
            });
    };

    const primaryColor = '#000000';
    const lighterColor = new TinyColor(primaryColor).lighten(20).toString();

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh', width: '100vw', backgroundColor: 'white', padding: '20px' }}>
            <div className="h1"
                style={{
                    fontSize: '2.4rem',
                    color: primaryColor,
                    marginBottom: '3rem',
                    marginTop: '4rem',
                    fontWeight: 'bold',
                }}
            >
                Your Foodie Experience
            </div>
            {data.length > 0 ? (
                <>
                    <Card
                        style={{ width: `${maxWidth}px`, overflow: 'hidden' }}
                        cover={<div style={{ backgroundColor: selectedEmoji.color, fontSize: '40px', textAlign: 'center', width: '100%' }}>{selectedEmoji.emoji}</div>}
                        actions={[
                            <IosShareIcon key="upload" onClick={handleShare} style={{ fontSize: '24px', color: primaryColor, transition: 'color 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.color = lighterColor} onMouseLeave={(e) => e.currentTarget.style.color = primaryColor} />
                        ]}
                    >
                        <div style={{ maxHeight: '300px', overflowY: data.length > 3 ? 'auto' : 'hidden' }}>
                            {data.map((item, index) => (
                                <Meta
                                    key={item.key}
                                    title={item.name}
                                    description={`Rating: ${item.rating} - Location: ${item.location}`}
                                    style={{ borderBottom: index !== data.length - 1 ? '1px solid #eee' : '', padding: '10px' }}
                                />
                            ))}
                        </div>
                    </Card>
                </>
            ) : (
                <div style={{ marginTop: '20vh', fontSize: '24px', fontWeight: 'bold', color: 'red' }}>
                    We couldn't find any posts about your food journey.
                </div>
            )}
        </div>
    );

};

export default SharePage;