FROM microsoft/aspnetcore:2.0-stretch AS base
WORKDIR /app
EXPOSE 80

FROM microsoft/aspnetcore-build:2.0-stretch AS build
WORKDIR /src
COPY ["TripTracker.UI/TripTracker.UI.csproj", "TripTracker.UI/"]
COPY ["TripTracker.BackService/TripTracker.BackService.csproj", "TripTracker.BackService/"]
RUN dotnet restore "TripTracker.UI/TripTracker.UI.csproj"
COPY . .
WORKDIR "/src/TripTracker.UI"
RUN dotnet build "TripTracker.UI.csproj" -c Release -o /app

FROM build AS publish
RUN dotnet publish "TripTracker.UI.csproj" -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "TripTracker.UI.dll"]
