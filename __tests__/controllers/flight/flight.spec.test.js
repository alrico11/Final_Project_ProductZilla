const controllers = require('../../../controllers/flight/flightController');
const FlightModel = require('../../../models/flight/flight');


describe('getFlight controller', () => {
  it('should return a flight', async () => {
    const flight = { id: 1, number: 'ABC123' };
    jest.spyOn(FlightModel, 'findById').mockImplementation(() => ({
      populate: jest.fn().mockImplementation(() => flight),
    }));
    const req = { params: { id: 1 } };
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
    await controllers.getFlight(req, res);
    // console.log(res.json.mock.calls)
    expect(res.json.mock.calls[0][0]).toHaveProperty('message');

    FlightModel.findById.mockRestore();
  });

  it('should return 404 if flight not found', async () => {
    jest.spyOn(FlightModel, 'findById').mockImplementation(() => null);

    const req = { params: { id: 1 } };
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

    await controllers.getFlight(req, res);
    //console.log(res.json.mock.calls)

    expect(res.json.mock.calls[0][0]).toHaveProperty('message');

    FlightModel.findById.mockRestore();
  });

  it('should return 500 if an error occurs', async () => {
    const error = new Error('Internal server error');
    jest.spyOn(FlightModel, 'findById').mockImplementation(() => {
      throw error;
    });

    const req = { params: { id: 1 } };
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

    await controllers.getFlight(req, res);

    expect(FlightModel.findById).toHaveBeenCalledWith(1);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: error.message });

    FlightModel.findById.mockRestore();
  });
});

describe('createFlight', () => {
  it('should create a new flight and return it', async () => {
    const savedFlight = {
      "flightNumber": "AA123",
      "airline": "American Airlines",
      "departure": [
        {
          "departure_airport": "JFK",
          "departure_city": "New York",
          "departure_country": "USA",
          "departure_date": "2021-08-01T10:00:00.000Z",
          "departure_time": "10:00 AM"
        }
      ],
      "arrival": [
        {
          "arrival_airport": "LHR",
          "arrival_city": "London",
          "arrival_country": "UK",
          "arrival_date": "2021-08-02T14:00:00.000Z",
          "arrival_time": "2:00 PM"
        }
      ],
      "price": 500,
      "seats": 200,
      "availableSeats": 100,
      "createdDate": "2021-07-01T10:00:00Z"
    };

    jest.spyOn(FlightModel.prototype, 'save').mockResolvedValue(savedFlight);
    jest.spyOn(FlightModel, 'findById').mockReturnValue({
      populate: jest.fn().mockResolvedValue(savedFlight)
    });
    const req = {
      body: savedFlight
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    await controllers.createFlight(req, res);
    // console.log(res.json.mock.calls)
    expect(res.json.mock.calls[0][0]).toHaveProperty('message');
  });
})


describe('updateFlight', () => {
  it('should update a flight and return it', async () => {
    const updatedFlight = {
      "flightNumber": "AA123",
      "airline": "American Airlines",
      "departure": [
        {
          "departure_airport": "JFK",
          "departure_city": "New York",
          "departure_country": "USA",
          "departure_date": "2021-08-01T10:00:00.000Z",
          "departure_time": "10:00 AM"
        }
      ],
      "arrival": [
        {
          "arrival_airport": "LHR",
          "arrival_city": "London",
          "arrival_country": "UK",
          "arrival_date": "2021-08-02T14:00:00.000Z",
          "arrival_time": "2:00 PM"
        }
      ],
      "price": 500,
      "seats": 200,
      "availableSeats": 100,
      "createdDate": "2021-07-01T10:00:00Z"
    };

    jest.spyOn(FlightModel, 'findByIdAndUpdate').mockResolvedValue(updatedFlight);
    jest.spyOn(FlightModel, 'findById').mockReturnValue({
      populate: jest.fn().mockResolvedValue(updatedFlight)
    });
    const req = {
      params: {
        id: 1
      },
      body: updatedFlight
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    await controllers.updateFlight(req, res);
    // console.log(res.json.mock.calls)
    expect(res.json.mock.calls[0][0]).toHaveProperty('message');
  });

  it('should return 404 if flight not found', async () => {
    jest.spyOn(FlightModel, 'findByIdAndUpdate').mockResolvedValue(null);

    const req = { params: { id: 1 } };
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

    await controllers.updateFlight(req, res);
    //console.log(res.json.mock.calls)

    expect(res.json.mock.calls[0][0]).toHaveProperty('message');

    FlightModel.findByIdAndUpdate.mockRestore();
  });

  it('should return 500 if an error occurs', async () => {
    const error = new Error('Internal server error');
    jest.spyOn(FlightModel, 'findByIdAndUpdate').mockImplementation(() => {
      throw error;
    });

    const req = { params: { id: 1 } };
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

    await controllers.updateFlight(req, res);

    expect(FlightModel.findByIdAndUpdate).toHaveBeenCalledWith(req.params.id);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: error.message });

    FlightModel.findByIdAndUpdate.mockRestore();
  });
});

describe('deleteFlight', () => {
  it('should delete a flight and return a message', async () => {
    const deletedFlight = {
      "flightNumber": "AA123",
      "airline": "American Airlines",
      "departure": [
        {
          "departure_airport": "JFK",
          "departure_city": "New York",
          "departure_country": "USA",
          "departure_date": "2021-08-01T10:00:00.000Z",
          "departure_time": "10:00 AM"
        }
      ],
      "arrival": [
        {
          "arrival_airport": "LHR",
          "arrival_city": "London",
          "arrival_country": "UK",
          "arrival_date": "2021-08-02T14:00:00.000Z",
          "arrival_time": "2:00 PM"
        }
      ],
      "price": 500,
      "seats": 200,
      "availableSeats": 100,
      "createdDate": "2021-07-01T10:00:00Z"
    };

    jest.spyOn(FlightModel, 'findById').mockResolvedValue(deletedFlight);
    jest.spyOn(FlightModel.prototype, 'deleteOne').mockResolvedValue();
    const req = {
      params: {
        id: 1
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    await controllers.deleteFlight(req, res);
    expect(res.json.mock.calls[0][0]).toHaveProperty('message');
  });

  it('should return 404 if flight not found', async () => {
    jest.spyOn(FlightModel, 'findById').mockResolvedValue(null);

    const req = { params: { id: 1 } };
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

    await controllers.deleteFlight(req, res);

    expect(res.json.mock.calls[0][0]).toHaveProperty('message');

    FlightModel.findById.mockRestore();
  });

  it('should return 500 if an error occurs', async () => {
    const error = new Error('Internal server error');
    jest.spyOn(FlightModel, 'findById').mockImplementation(() => {
      throw error;
    });

    const req = { params: { id: 1 } };
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

    await controllers.deleteFlight(req, res);

    expect(FlightModel.findById).toHaveBeenCalledWith(req.params.id);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: error.message });

    FlightModel.findById.mockRestore();
  });
});