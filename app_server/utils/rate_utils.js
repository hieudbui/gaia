class RateUtils {
  sortByHighestBid(rates) {
    rates.sort((a, b) => {
      return b.bid - a.bid;
    });
  }

  sortByLowestBid(rates) {
    rates.sort((a, b) => {
      return a.bid - b.bid;
    });
  }
}
module.exports = new RateUtils()