FROM microsoft/dotnet:latest

COPY . /factoryApi

WORKDIR /factoryApi

RUN ["dotnet", "restore"]

RUN ["dotnet", "build"]

EXPOSE 5001

CMD ["dotnet", "run"]