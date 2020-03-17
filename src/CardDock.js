import React from 'react';

const PROPERTY_LIST = [
    'Implementation Dates',
    'Location',
    'Number of Recipients',
    'Implementing Agency',
    'Research Agency',
    'Funding Agency',
    'Type of Targeting',
    'Unit of Recipient',
    'Amount of Transfer',
    'Frequency of Payment',
    'Method of Evaluation',
    'Additional Notes of Interest',
    'Link to Website',
    'Links to Related Resources'
];

const EXPANDIBLE_LIST = [
    'Location',
    'Implementing Agency',
    'Research Agency',
    'Funding Agency',
    'Type of Targeting',
    'Unit of Recipient',
    'Amount of Transfer',
    'Frequency of Payment',
    'Method of Evaluation',
    'Additional Notes of Interest',
    'Link to Website',
    'Links to Related Resources'
];

// pure component? (shallow compare map features?) (perf)

// TODO: make more robust (stab)
const convertProperty = property => {
    return property.split('').map(ltr => {
        if (ltr === ' ') {
            return '';
        } else {
            return ltr.toLowerCase();
        }
    }).join('');
}

class CardDock extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = { minimized: true, expandedProperties: {} };

    this.removeCard = this.removeCard.bind(this);
  }

  removeCard(id) {
      this.props.removeCard(id);
    }
    
    render() {
    // TODO: don't bind in render (perf)
        const names = this.props.cardData.map(card => (
            <th key={card.expid+'-th'} className="name">
                {card.name||'(none)'}
                <p onClick={this.removeCard.bind(this, card.expid)} className="remove">X</p>
            </th>
    ));

    const propertyRows = PROPERTY_LIST.map(property => {
        const propertyCells = this.props.cardData.map(card => (
            <td className="property-cell" key={card.expid+'-td-'+property}>
                <p className="property-name">{property}</p>
                <p className="property-value">{card[convertProperty(property)]||'(none)'}</p>
            </td>
        ));
        return <tr className="property-row" key={property}>{propertyCells}</tr>;
    });

    return (
        <table className='card-dock'>
            <thead>
                {names}
            </thead>
            <tbody>
                {propertyRows}
            </tbody>
        </table>
    )
  }
}

export default CardDock;