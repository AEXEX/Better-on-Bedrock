export const randomIndex = (distribution) => distribution[Math.floor(Math.random() * distribution.length)];
export const randomItem = (array, distribution) => array[randomIndex(distribution)];
export const createDistribution = (weights) => {
    const distribution = [];
    const sum = weights.reduce((a, b) => a + b);
    const quant = 10 / sum;
  	for (let i = 0; i < weights.length; ++i) {
      	const limit = quant * weights[i];
      	for (let j = 0; j < limit; ++j) distribution.push(i);
    };
	
  	return distribution;
};