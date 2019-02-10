
export const aeTransacted = {
  type: 'line',
  data: {
    labels: ['1/1/19', '2/1/19', '3/1/19', '4/1/19', '5/1/19', '6/1/19', '7/1/19', '8/1/19', '9/1/19'],
    datasets: [
      {
        label: 'Transactions',
        data: [1111110, 1110, 1, 11111, 27111111, 6711111, 6111112, 2110, 14],
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
      text: 'AE transacted per day',
      fontSize: 18
    },
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            padding: 25,
            callback: function (label, index, labels) {
              return label / 1000 + 'k AE'
            },
            fontSize: 12
          },
          scaleLabel: {
            display: true,
            labelString: '1k = 1000',
            fontSize: 12
          }
        }
      ],
      xAxes: [
        {
          ticks: {
            fontSize: 12
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

export default aeTransacted
