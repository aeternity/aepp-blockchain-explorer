
export const transactionRate = {
  type: 'line',
  data: {
    labels: ['1/1/19', '2/1/19', '3/1/19', '4/1/19', '5/1/19', '6/1/19', '7/1/19', '8/1/19', '9/1/19'],
    datasets: [
      {
        label: 'Transactions',
        data: [1110, 1111110, 1, 11111, 2111, 6711111, 6111112, 27111111, 14],
        fill: false,
        borderColor: [
          '#FF0D6A'
        ],
        borderWidth: 3
      }
    ]
  },
  options: {
    responsive: true,
    lineTension: 1,
    legend: {
      display: false
    },
    title: {
      display: true,
      text: 'Transactions per day',
      fontSize: 15
    },
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            padding: 25,
            callback: function (label, index, labels) {
              return label / 1000 + 'k'
            },
            fontSize: 10
          },
          scaleLabel: {
            display: true,
            labelString: '1k = 1000',
            fontSize: 10
          }
        }
      ],
      xAxes: [
        {
          ticks: {
            fontSize: 10
          }
        }
      ]
    },
    tooltips: {
      displayColors: false,
      callbacks: {
        label: function (tooltipItem) {
          return tooltipItem.xLabel + ': ' + tooltipItem.yLabel
        },
        title: function (tooltipItem, data) {}
      },
      bodyFontColor: '#fff',
      backgroundColor: '#FF0D6A'
    }
  }
}

export default transactionRate
