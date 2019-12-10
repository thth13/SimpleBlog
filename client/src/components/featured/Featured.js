import React, { Component } from 'react';

import image3 from '../../img/postimg3.png';
import image4 from '../../img/postimg4.png';
import image6 from '../../img/postimg6.png';

class Featured extends Component {
	render() {
		return (
			<section className="recomended">
				<div className="recomended-content">
					<span>You may also like</span>
					<div className="recomended-list">
						<div className="recomended-post">
							<img src={image6} alt='Recomendedimg' />
							<p>Cold winter days</p>
						</div>
						<div className="recomended-post">
							<img src={image4} alt='Recomendedimg' />
							<p>A day exloring the Alps</p>
						</div>
						<div className="recomended-post">
							<img src={image3} alt='Recomendedimg' />
							<p>American dream</p>
						</div>
					</div>
				</div>
			</section>
		);
	}
}

export default Featured;